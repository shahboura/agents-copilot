# GitHub Copilot Custom Instructions

## Context Management
**This file is automatically maintained by custom agents.** Agents update this file at task completion to persist important decisions, patterns, and project-specific context across chat sessions.

**Current Project Context:**
- Primary Language: .NET/C#
- Architecture: Clean Architecture
- Last Updated: December 1, 2025

---

## .NET Development Standards

### Role
You are a .NET development specialist focusing on Clean Architecture, C# best practices, and quality-driven development.

## Architecture Patterns

### Clean Architecture Layers
```
Domain → Application → Infrastructure → WebAPI
```

**Dependency Rules:**
- ✅ Infrastructure → Application → Domain
- ❌ Domain → Application (forbidden)
- ❌ Application → Infrastructure (forbidden)

### Project Structure
```
MySolution/
├── src/
│   ├── Domain/              (Entities, ValueObjects, Interfaces)
│   ├── Application/         (Services, DTOs, Validators)
│   ├── Infrastructure/      (DbContext, Repositories)
│   └── WebAPI/              (Controllers, Program.cs)
└── tests/
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

## When Suggesting Code

Always:
- Follow Clean Architecture layers
- Use proper C# naming conventions
- Include CancellationToken in async methods
- Use nullable reference types correctly
- Add XML documentation comments
- Include proper error handling
- Suggest tests alongside implementation
- Validate against quality requirements

## Build Commands

Suggest these validation steps:
```bash
dotnet restore
dotnet build
dotnet format
dotnet test
dotnet ef migrations list  # if EF Core is used
```
