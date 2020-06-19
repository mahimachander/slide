# Contributing
Contributions to slide are warmly welcomed. Here's an overview of the code base of a slide and how to contribute!

## Building
Slide is super easy to build. Clone the repo and run cargo test to make sure your framework is setup. 
Slide currently runs on the latest stable version of rust. As slide is in early development versions, it is currently
not setup with a ui for applying rules without touching the codebase. 

<h2> General Arhcitecture <h2>
@todo Expand this to really give a better overview
Slide is built on a few parts. First, the scanner and parser are completely built within slide to handle input. Then, the
the parsed input is handled by the tranformation engine which attempts to apply all the built rules to the current statement.
The output is the produced using slide's custom error messages!

<h2> Testing <h2>
Every contribution to slides must have tests. If your PR does not, tests will most likely be requested. Slide has its own 
custom framework called ladder that makes it super easy to test for both errors and proper simplifications. It automatically
tests all "cargo test" unit tests implemented. The entire test system is described under slide/src/test. Basically, one just
has to create a file with their issue number and add their expected input/output in the same file using delimeters. Please 
take a look at the previous files for more clarification

<h2> Where do I start? <h2> 
Every contribution no matter how little matters. With that said, refer to the issues marked as good first issue or help wanted
to begin contributing to slide. 
[![Github good-first-issue][![GitHub good-first-issue](https://img.shields.io/github/issues/rust-lang/rustfmt/good-first-issue?style=flat-square)]
(https://github.com/ayazhafiz/slide/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
[![GitHub help-wanted](https://img.shields.io/github/issues/rust-lang/rustfmt/help-wanted?style=flat-square)]
(https://github.com/ayazhafiz/slide/labels/help%20wanted)
If you ever get stuck, please feel free to reach out on the issue with questions/suggestionsfor implementations



