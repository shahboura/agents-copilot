---
description: Rust best practices with ownership, error handling, and testing
applyTo: '**/*.rs'
---

# Rust Instructions

## Tooling & Project Setup
- Use `cargo` for all build, test, and dependency management
- Keep dependencies minimal and audit with `cargo audit`
- Format with `cargo fmt` before every commit
- Lint with `cargo clippy -- -D warnings` (treat warnings as errors)
- Use stable Rust unless unstable features are absolutely required

## Code Standards

### Naming Conventions
- Types/Traits: `PascalCase`
- Functions/Variables: `snake_case`
- Constants/Statics: `SCREAMING_SNAKE_CASE`
- Lifetimes: `'lowercase` (e.g., `'a`, `'static`)

### Ownership & Borrowing
**Embrace Rust's ownership system:**
```rust
// ✅ Pass by reference when you don't need ownership
fn process_user(user: &User) {
    println!("{}", user.name);
}

// ✅ Take ownership when consuming
fn save_user(user: User) -> Result<(), Error> {
    database.insert(user)
}

// ✅ Mutable references when needed
fn update_email(user: &mut User, email: String) {
    user.email = email;
}

// ✅ Clone explicitly when needed
fn duplicate_user(user: &User) -> User {
    user.clone()
}
```

### Error Handling with Result
**Use `Result` for fallible operations:**
```rust
use std::io;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum UserError {
    #[error("User not found: {0}")]
    NotFound(String),
    
    #[error("Invalid email format")]
    InvalidEmail,
    
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),
    
    #[error(transparent)]
    Io(#[from] io::Error),
}

// ✅ Return Result from fallible functions
pub fn get_user(id: &str) -> Result<User, UserError> {
    let user = database::find_user(id)
        .ok_or_else(|| UserError::NotFound(id.to_string()))?;
    Ok(user)
}

// ✅ Use ? operator for early returns
pub fn create_user(email: &str, name: &str) -> Result<User, UserError> {
    validate_email(email)?;
    let user = User::new(email, name);
    database::save(&user)?;
    Ok(user)
}
```

### Option for Nullable Values
```rust
// ✅ Use Option for values that may not exist
fn find_user_by_email(email: &str) -> Option<User> {
    database.users.iter()
        .find(|u| u.email == email)
        .cloned()
}

// ✅ Pattern matching on Option
match find_user_by_email("test@example.com") {
    Some(user) => println!("Found: {}", user.name),
    None => println!("User not found"),
}

// ✅ Combinators for cleaner code
let email = user
    .profile
    .and_then(|p| p.email)
    .unwrap_or_else(|| "unknown@example.com".to_string());
```

### Structs & Implementations
```rust
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct User {
    pub id: String,
    pub email: String,
    pub name: String,
    created_at: chrono::DateTime<chrono::Utc>,
}

impl User {
    /// Creates a new user with the current timestamp
    pub fn new(email: String, name: String) -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            email,
            name,
            created_at: chrono::Utc::now(),
        }
    }
    
    /// Validates the user's email format
    pub fn validate_email(&self) -> Result<(), UserError> {
        if !self.email.contains('@') {
            return Err(UserError::InvalidEmail);
        }
        Ok(())
    }
}

// Default implementation
impl Default for User {
    fn default() -> Self {
        Self::new("user@example.com".to_string(), "Anonymous".to_string())
    }
}
```

### Traits for Polymorphism
```rust
// ✅ Define traits for shared behavior
pub trait Repository<T> {
    fn find_by_id(&self, id: &str) -> Result<Option<T>, Error>;
    fn save(&mut self, item: T) -> Result<(), Error>;
    fn delete(&mut self, id: &str) -> Result<(), Error>;
}

// ✅ Implement traits
pub struct UserRepository {
    users: HashMap<String, User>,
}

impl Repository<User> for UserRepository {
    fn find_by_id(&self, id: &str) -> Result<Option<User>, Error> {
        Ok(self.users.get(id).cloned())
    }
    
    fn save(&mut self, user: User) -> Result<(), Error> {
        self.users.insert(user.id.clone(), user);
        Ok(())
    }
    
    fn delete(&mut self, id: &str) -> Result<(), Error> {
        self.users.remove(id);
        Ok(())
    }
}
```

## Async Programming

### Async Functions with Tokio
```rust
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let user = fetch_user("123").await?;
    println!("User: {}", user.name);
    Ok(())
}

async fn fetch_user(id: &str) -> Result<User, UserError> {
    let response = reqwest::get(&format!("https://api.example.com/users/{}", id))
        .await?
        .json::<User>()
        .await?;
    Ok(response)
}

// ✅ Concurrent async operations
async fn load_data() -> Result<(Vec<User>, Vec<Post>), Error> {
    let (users, posts) = tokio::join!(
        fetch_users(),
        fetch_posts()
    );
    Ok((users?, posts?))
}
```

## Testing

### Unit Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_user_creation() {
        let user = User::new("test@example.com".to_string(), "Test User".to_string());
        assert_eq!(user.email, "test@example.com");
        assert_eq!(user.name, "Test User");
    }
    
    #[test]
    fn test_invalid_email() {
        let mut user = User::default();
        user.email = "invalid-email".to_string();
        assert!(user.validate_email().is_err());
    }
    
    #[test]
    #[should_panic(expected = "User not found")]
    fn test_missing_user_panics() {
        get_user_or_panic("nonexistent");
    }
}
```

### Integration Tests
```rust
// tests/integration_test.rs
use my_crate::*;

#[tokio::test]
async fn test_user_service() {
    let service = UserService::new();
    let user = service.create_user("test@example.com", "Test").await.unwrap();
    
    let fetched = service.get_user(&user.id).await.unwrap();
    assert_eq!(fetched.email, "test@example.com");
}
```

### Property-Based Testing
```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn test_user_email_roundtrip(email in "[a-z]+@[a-z]+\\.[a-z]+") {
        let user = User::new(email.clone(), "Test".to_string());
        prop_assert_eq!(user.email, email);
    }
}
```

## Web Development (Axum)

### Application Setup
```rust
use axum::{
    Router,
    routing::{get, post},
    extract::{Path, State},
    Json,
    http::StatusCode,
};
use std::sync::Arc;

#[tokio::main]
async fn main() {
    let app_state = Arc::new(AppState::new());
    
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/users", get(list_users).post(create_user))
        .route("/users/:id", get(get_user))
        .with_state(app_state);
    
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000")
        .await
        .unwrap();
    
    axum::serve(listener, app).await.unwrap();
}
```

### Route Handlers
```rust
async fn health_check() -> &'static str {
    "OK"
}

async fn get_user(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<User>, StatusCode> {
    state.user_service
        .get_user(&id)
        .await
        .map(Json)
        .ok_or(StatusCode::NOT_FOUND)
}

async fn create_user(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<CreateUserRequest>,
) -> Result<(StatusCode, Json<User>), StatusCode> {
    let user = state.user_service
        .create_user(payload)
        .await
        .map_err(|_| StatusCode::BAD_REQUEST)?;
    
    Ok((StatusCode::CREATED, Json(user)))
}
```

## Best Practices

### Avoid Unwrap in Production
```rust
// ❌ Don't use unwrap() in production code
let user = get_user(id).unwrap();

// ✅ Handle errors properly
let user = get_user(id)
    .map_err(|e| {
        log::error!("Failed to get user: {}", e);
        e
    })?;

// ✅ Or use expect() with context
let config = load_config()
    .expect("Config file must exist at startup");
```

### Minimize Clone
```rust
// ❌ Unnecessary clones
fn process_items(items: Vec<Item>) {
    for item in items.clone() {
        println!("{:?}", item);
    }
}

// ✅ Use references
fn process_items(items: &[Item]) {
    for item in items {
        println!("{:?}", item);
    }
}
```

### Use Iterators
```rust
// ✅ Functional, iterator-based code
let active_users: Vec<_> = users.iter()
    .filter(|u| u.is_active)
    .map(|u| u.email.clone())
    .collect();

// ✅ Early termination with iterators
let has_admin = users.iter().any(|u| u.role == Role::Admin);
```

## Quality Requirements

**Every Rust file MUST:**
1. ✅ Compile with zero warnings (`cargo build`)
2. ✅ Pass clippy with no warnings (`cargo clippy`)
3. ✅ Be formatted (`cargo fmt`)
4. ✅ Use proper error handling (no naked `unwrap()` in production)
5. ✅ Include unit tests for public APIs
6. ✅ Document public items with `///` comments

## Validation Commands

```bash
# Build
cargo build

# Build optimized
cargo build --release

# Run tests
cargo test

# Test with output
cargo test -- --nocapture

# Format code
cargo fmt

# Lint
cargo clippy -- -D warnings

# Security audit
cargo audit

# Check without building
cargo check

# Run benchmarks
cargo bench
```
