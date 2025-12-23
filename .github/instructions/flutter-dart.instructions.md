---
description: Flutter/Dart best practices with null safety, testing, and tooling
applyTo: '**/*.dart'
---

# Flutter & Dart Instructions

## Project & Tooling
- Use `flutter analyze` to keep analyzer warnings at zero.
- Format with `dart format .` (or `flutter format .`) before committing.
- Manage dependencies via `flutter pub get`; lock versions in `pubspec.lock`.
- Keep environment SDK constraints updated in `pubspec.yaml` (e.g., Dart >= 3).

## Code Standards
- Enable null safety everywhere; avoid `!` unless justified and documented.
- Prefer immutable data (use `const` constructors and `final` fields when possible).
- Name classes/types in `PascalCase`, variables/functions in `camelCase`, constants in `SCREAMING_SNAKE_CASE`.
- Keep files focused: widgets/components small and composable; extract shared helpers.

## Widgets & State
- Use `const` widgets where possible to reduce rebuilds.
- Keep build methods pure; avoid side effects in `build`.
- Choose a state management pattern and stay consistent (e.g., Provider, Bloc/Cubit, Riverpod); avoid mixing ad hoc globals.
- Dispose of controllers/streams in `dispose()`; cancel timers and subscriptions.

## Async & I/O
- Use `async`/`await` with proper error handling; surface failures with typed results or domain errors.
- Avoid blocking the UI thread; offload heavy work using isolates or compute when needed.
- Close streams/sinks and HTTP clients; use `try/finally` for cleanup.

## Testing
- Add unit/widget tests for public logic and critical UI flows: `flutter test`.
- Mock external dependencies; avoid real network calls in tests.
- Verify golden tests for visual regressions when applicable.

## Performance & UX
- Minimize rebuilds: lift state up, memoize expensive computations, use keys appropriately.
- Cache images/data when appropriate; avoid unnecessary `setState` calls.
- Keep accessibility in mind: semantics labels, focus order, sufficient contrast.

## Error Handling & Logging
- Fail fast on developer errors, but show user-friendly messages.
- Centralize error/reporting hooks; avoid printing secrets or PII in logs.

## Security
- Never hardcode secrets/keys; use secure storage or backend configuration.
- Validate and sanitize all external input; be cautious with dynamic code loading.

## Validation Commands
```bash
flutter pub get
flutter analyze
flutter test
flutter format .
```