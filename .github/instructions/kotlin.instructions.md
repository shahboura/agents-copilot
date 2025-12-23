---
description: Kotlin best practices for Android and backend development
applyTo: '**/*.kt'
---

# Kotlin Instructions

## Tooling & Build
- Use Gradle with Kotlin DSL (build.gradle.kts) for type-safe build scripts
- Target latest stable Kotlin version (1.9+)
- Enable explicit API mode for libraries: `kotlin.explicitApi=strict`
- Use ktlint or detekt for linting; format with IntelliJ/AS defaults

## Code Standards

### Naming Conventions
- Classes/Objects: `PascalCase`
- Functions/Properties: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Private properties: `_camelCase` (when needed to distinguish from public)

### Null Safety
**Leverage Kotlin's null safety system:**
```kotlin
// ✅ Explicit nullable types
fun findUser(id: String): User? {
    return repository.findById(id)
}

// ✅ Safe calls and Elvis operator
val email = user?.profile?.email ?: "unknown@example.com"

// ✅ Early return with null check
fun processUser(user: User?) {
    user ?: return
    // user is smart-cast to non-null here
    println(user.name)
}

// ❌ Avoid !! unless absolutely necessary and documented
val name = user!!.name  // Only if you're 100% sure
```

### Immutability
**Prefer `val` over `var`:**
```kotlin
// ✅ Immutable by default
val users = listOf<User>()
val config = Config(apiUrl = "https://api.example.com")

// ✅ Use data classes for DTOs
data class UserDto(
    val id: String,
    val email: String,
    val name: String
)

// ✅ Immutable collections
val items: List<Item> = emptyList()
val map: Map<String, Value> = emptyMap()
```

### Coroutines for Async Operations
**Use coroutines, not callbacks:**
```kotlin
// ✅ Suspend functions
suspend fun fetchUser(id: String): User {
    return withContext(Dispatchers.IO) {
        api.getUser(id)
    }
}

// ✅ Structured concurrency
suspend fun loadData() = coroutineScope {
    val users = async { fetchUsers() }
    val posts = async { fetchPosts() }
    DataResult(users.await(), posts.await())
}

// ✅ Flow for streams
fun observeUsers(): Flow<List<User>> = flow {
    while (true) {
        emit(repository.getAllUsers())
        delay(5000)
    }
}
```

### Extension Functions
**Use extensions for utility functions:**
```kotlin
// ✅ Extension functions
fun String.isValidEmail(): Boolean {
    return this.contains("@") && this.contains(".")
}

fun <T> List<T>.second(): T? = this.getOrNull(1)

// Usage
val email = "test@example.com"
if (email.isValidEmail()) { /* ... */ }
```

## Android Development

### ViewModel Pattern
```kotlin
class UserViewModel(
    private val repository: UserRepository
) : ViewModel() {
    
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()
    
    fun loadUsers() {
        viewModelScope.launch {
            _users.value = repository.getUsers()
        }
    }
}
```

### Compose UI
```kotlin
@Composable
fun UserScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    val users by viewModel.users.collectAsState()
    
    LazyColumn {
        items(users) { user ->
            UserItem(user = user)
        }
    }
}

@Composable
fun UserItem(user: User) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
    ) {
        Text(text = user.name)
    }
}
```

## Backend Development (Ktor)

### Application Setup
```kotlin
fun Application.module() {
    install(ContentNegotiation) {
        json()
    }
    install(CallLogging)
    
    configureRouting()
}

fun Application.configureRouting() {
    routing {
        get("/health") {
            call.respond(mapOf("status" to "ok"))
        }
        
        userRoutes()
    }
}
```

### Route Handlers
```kotlin
fun Route.userRoutes() {
    route("/users") {
        get {
            val users = userService.getAllUsers()
            call.respond(users)
        }
        
        get("/{id}") {
            val id = call.parameters["id"] 
                ?: return@get call.respond(HttpStatusCode.BadRequest)
            
            val user = userService.getUser(id)
                ?: return@get call.respond(HttpStatusCode.NotFound)
            
            call.respond(user)
        }
        
        post {
            val request = call.receive<CreateUserRequest>()
            val user = userService.createUser(request)
            call.respond(HttpStatusCode.Created, user)
        }
    }
}
```

## Testing

### Unit Tests
```kotlin
class UserServiceTest {
    private val mockRepository = mockk<UserRepository>()
    private val service = UserService(mockRepository)
    
    @Test
    fun `getUser returns user when found`() = runTest {
        // Given
        val userId = "123"
        val expectedUser = User(userId, "test@example.com")
        coEvery { mockRepository.findById(userId) } returns expectedUser
        
        // When
        val result = service.getUser(userId)
        
        // Then
        assertEquals(expectedUser, result)
        coVerify { mockRepository.findById(userId) }
    }
    
    @Test
    fun `getUser returns null when not found`() = runTest {
        // Given
        coEvery { mockRepository.findById(any()) } returns null
        
        // When
        val result = service.getUser("999")
        
        // Then
        assertNull(result)
    }
}
```

### Android Instrumentation Tests
```kotlin
@RunWith(AndroidJUnit4::class)
class UserScreenTest {
    
    @get:Rule
    val composeTestRule = createComposeRule()
    
    @Test
    fun userScreen_displaysUsers() {
        // Given
        val users = listOf(
            User("1", "user1@example.com", "User 1"),
            User("2", "user2@example.com", "User 2")
        )
        
        // When
        composeTestRule.setContent {
            UserScreen(users = users)
        }
        
        // Then
        composeTestRule.onNodeWithText("User 1").assertIsDisplayed()
        composeTestRule.onNodeWithText("User 2").assertIsDisplayed()
    }
}
```

## Best Practices

### Sealed Classes for State
```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

// Usage
when (val result = fetchData()) {
    is Result.Success -> displayData(result.data)
    is Result.Error -> showError(result.message)
    Result.Loading -> showLoading()
}
```

### Scope Functions
```kotlin
// ✅ Use appropriate scope functions
val user = User("id").apply {
    name = "John"
    email = "john@example.com"
}

val length = user.name.let { it.length }

with(user) {
    println(name)
    println(email)
}
```

### Delegation
```kotlin
// ✅ Property delegation
class UserPreferences(private val prefs: SharedPreferences) {
    var username: String by prefs.string("username", default = "")
    var darkMode: Boolean by prefs.boolean("dark_mode", default = false)
}

// ✅ Interface delegation
class LoggingRepository(
    private val repository: Repository
) : Repository by repository {
    override suspend fun save(data: Data) {
        log("Saving data: $data")
        repository.save(data)
    }
}
```

## Quality Requirements

**Every Kotlin file MUST:**
1. ✅ Use explicit types for public APIs
2. ✅ Leverage null safety (avoid `!!`)
3. ✅ Prefer immutability (`val` over `var`)
4. ✅ Use coroutines for async operations
5. ✅ Pass ktlint/detekt checks
6. ✅ Include unit tests for business logic

## Validation Commands

```bash
# Build
./gradlew build

# Run tests
./gradlew test

# Lint
./gradlew ktlintCheck

# Format
./gradlew ktlintFormat

# Android: Run instrumentation tests
./gradlew connectedAndroidTest
```
