
# Flutter Conceptual Foundations

## Runtime

**Runtime** is the environment that executes a program **while it is running**, on the **target system**.

- Compilation happens on the development machine.
- Execution happens on the target system (user device, emulator, browser, etc.).
- Runtime is responsible for:
  - executing code
  - memory management
  - event loops and async handling
  - lifecycle during execution

In Flutter:
- Mobile/Desktop: release builds compile Dart code for the target and ship the
  Flutter engine and required runtime support with the application.
- Web: Flutter can compile application code to JavaScript or WebAssembly,
  depending on the selected build mode and platform support.
- Users do **not** need Flutter or Dart installed.

---

## Platform Adapter

A **platform adapter** is the layer that allows Flutter to communicate with a specific operating system.

It translates between:
- Flutter concepts (widgets, gestures, lifecycle)
- Platform concepts (windows, views, input events, OS services)

Examples:
- Android adapter embeds Flutter inside an Android Activity and connects to Android graphics/input systems.
- Web adapter connects Flutter rendering to browser APIs (Canvas/WebGL/DOM).
- Desktop adapters connect Flutter to native windowing systems.

Flutter's platform integration enables substantial shared application code,
although plugins, capabilities, and platform-specific behavior can still
require target-specific adaptation.

---

## Flutter Toolchain

The **Flutter toolchain** is the set of tools Flutter uses to manage building and running apps.

It includes:
- Dart SDK
- Flutter framework (widgets, layout, animation)
- Flutter CLI tools
- Platform adapters and build orchestration

Flutter's shared framework is cross-platform, while platform-specific embedders
and external toolchains handle target integration.

---

## Android SDK

The **Android SDK** is the official Android development toolchain.

It provides:
- Android platform APIs
- Build tools (aapt, dex, zipalign)
- adb (device communication)
- Emulator
- Platform runtimes

Flutter uses the Android SDK **only** when targeting Android.
Flutter does not replace the Android SDK; it orchestrates it.

---

## Build vs Run vs Ship

- **Build**: Transforming source code into a platform-specific artifact.
- **Run**: Executing the built app on a device or emulator.
- **Ship**: Distributing the built artifact to end users.

Flutter requires platform SDKs only for **build**, not for execution by users.

---

## Development Machine vs Target System

- Development machine:
  - used for writing code
  - compiling apps
  - testing locally

- Target system:
  - where the app actually executes
  - includes user devices, emulators, browsers

Runtime always lives on the **target system**.

---

## Flutter Desktop Output (Windows)

Flutter desktop apps are shipped as native binaries.

On Windows:
- Output includes a `.exe` file plus required DLLs and assets.
- Flutter engine and Dart runtime are bundled.
- End users do not need Flutter or Dart installed.

Equivalent native formats exist for macOS and Linux.

---

## Source

- [Flutter architectural overview](https://docs.flutter.dev/resources/architectural-overview)
