# GitHub Copilot Custom Instructions

## Project Overview

Multi-language GitHub Copilot agent orchestration system with specialized agents for .NET, Python, and TypeScript development.

**Agents:** 6 specialized agents (@planner, @orchestrator, @codebase, @docs, @review, @em-advisor)  
**Prompts:** 9 reusable slash commands  
**Standards:** Auto-applied coding standards by file type

> **Agent Context:** Agents read/write session context from `.github/agents.md`

---

## Auto-Applied Coding Standards

Pattern-based standards activate automatically when editing files:

- `**/*.{cs,csproj}` → [.NET Clean Architecture](instructions/dotnet-clean-architecture.instructions.md)
- `**/*.py` → [Python Best Practices](instructions/python-best-practices.instructions.md)
- `**/*.{ts,tsx}` → [TypeScript Strict Mode](instructions/typescript-strict.instructions.md)
- `**/*.dart` → [Flutter/Dart Best Practices](instructions/flutter-dart.instructions.md)
- `**/*.{js,ts}` (Node) → [Node.js + Express](instructions/node-express.instructions.md)
- `**/*.{tsx,jsx}` (React) → [React / Next.js](instructions/react-next.instructions.md)
- `**/*.go` → [Go Best Practices](instructions/go.instructions.md)
- `**/*.kt` → [Kotlin Best Practices](instructions/kotlin.instructions.md)
- `**/*.rs` → [Rust Best Practices](instructions/rust.instructions.md)
- `**/*.sql` → [SQL & Migrations](instructions/sql-migrations.instructions.md)
- `.github/workflows/*.{yml,yaml}` → [CI/CD Hygiene](instructions/ci-cd-hygiene.instructions.md)

---

## .NET Development Standards

### Role
.NET specialist: Clean Architecture, C# best practices, quality-driven development.

## Architecture Patterns

### Clean Architecture Layers
```
Domain → Application → Infrastructure → WebAPI
```

**Dependency Rules:**
- ✅ Infrastructure → Application → Domain
- ❌ Domain must NOT depend on Application
- ❌ Application must NOT depend on Infrastructure

### Project Structure
```
src/
├── Domain/              (Entities, ValueObjects, Interfaces)
├── Application/         (Services, DTOs, Validators)
├── Infrastructure/      (DbContext, Repositories)
└── WebAPI/              (Controllers, Program.cs)
```

## C# Standards

### Naming Conventions
- Classes/Methods: `PascalCase`
- Interfaces: `IPascalCase`
- Private fields: `_camelCase`
- Parameters: `camelCase`

### Async/Await
```csharp
// ✅ Always include CancellationToken
public async Task<User> GetUserAsync(int id, CancellationToken cancellationToken)
{
    return await _context.Users
        .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
}
```

### Nullable Reference Types
```csharp
// Enable in .csproj
<Nullable>enable</Nullable>

// Usage
public string Email { get; set; } = string.Empty;  // Non-nullable
public string? PhoneNumber { get; set; }            // Nullable
```

### Dependency Injection
```csharp
// Constructor injection only
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserService> _logger;

    public UserService(
        IUserRepository userRepository,
        ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }
}
```

## Entity Framework Core

### Entity Configuration
```csharp
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
        builder.HasIndex(u => u.Email).IsUnique();
    }
}
```

### Optimized Queries
```csharp
// ✅ Project early, use AsNoTracking for read-only
var users = await _context.Users
    .AsNoTracking()
    .Select(u => new UserDto { Id = u.Id, Email = u.Email })
    .ToListAsync(cancellationToken);
```

## Testing Patterns

### xUnit Unit Tests
```csharp
public class UserServiceTests
{
    private readonly Mock<IUserRepository> _mockRepo;
    private readonly UserService _sut;

    public UserServiceTests()
    {
        _mockRepo = new Mock<IUserRepository>();
        _sut = new UserService(_mockRepo.Object);
    }

    [Fact]
    public async Task GetUserAsync_ExistingUser_ReturnsUser()
    {
        // Arrange
        var user = new User { Id = 1, Email = "test@example.com" };
        _mockRepo.Setup(r => r.GetByIdAsync(1, default))
            .ReturnsAsync(user);

        // Act
        var result = await _sut.GetUserAsync(1, default);

        // Assert
        result.Should().NotBeNull();
        result.Email.Should().Be(user.Email);
    }
}
```

## Quality Requirements

### Every Code Change Must:
1. ✅ Compile with zero warnings
2. ✅ Pass all tests
3. ✅ Be formatted (dotnet format)
4. ✅ Use nullable reference types correctly
5. ✅ Include async/await with CancellationToken
6. ✅ Follow Clean Architecture layers

## Implementation Workflow

When asked to implement a feature:
1. **Analyze** the request and identify affected layers
2. **Plan** the implementation (entities, services, controllers, tests)
3. **Implement** from Domain → Application → Infrastructure → WebAPI
4. **Test** at each layer (unit tests, integration tests)
5. **Validate** build, tests, and formatting

## Common Patterns

### Repository Pattern
```csharp
// Interface in Application
public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<User> AddAsync(User user, CancellationToken cancellationToken);
}

// Implementation in Infrastructure
public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
    }
}
```

### Service Pattern
```csharp
public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly ILogger<UserService> _logger;

    public UserService(
        IUserRepository repository,
        ILogger<UserService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<UserDto?> GetUserByIdAsync(
        int id,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting user {UserId}", id);

        var user = await _repository.GetByIdAsync(id, cancellationToken);

        if (user is null)
        {
            _logger.LogWarning("User not found: {UserId}", id);
            return null;
        }

        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name
        };
    }
}
```

### Controller Pattern
```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDto>> GetUser(
        int id,
        CancellationToken cancellationToken)
    {
        var user = await _userService.GetUserByIdAsync(id, cancellationToken);
        return user is not null ? Ok(user) : NotFound();
    }
}
```

## Quality Requirements

**Every code change MUST:**
1. ✅ Compile with zero warnings
2. ✅ Pass all tests
3. ✅ Be formatted (dotnet format)
4. ✅ Use nullable reference types correctly
5. ✅ Include async/await with CancellationToken
6. ✅ Follow Clean Architecture layers

## Validation Commands

```bash
# .NET
dotnet restore
dotnet build
dotnet format
dotnet test

# Project validation
.\scripts\validate-agents.ps1      # Validate agent configs
.\scripts\check-context-size.ps1   # Check context file size
.\scripts\validate-docs.ps1        # Check documentation links
```
