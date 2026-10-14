# Assignment 4: Forms and Validation

**Student:** Zhadiger Saken  
**Group:** SE-2538  
**Course:** Front-End Development

This project demonstrates a progression from a basic HTML contact form to a responsive registration form. It uses HTML5 controls and constraints, Bootstrap 5.3.3 form classes and grid columns, a simple Arial layout, and plain JavaScript for inline validation. Each page has top task navigation, one task heading, and its form. The pages use a 16px base font size and standard Bootstrap controls. Student attribution and group information appear in this report; form examples use Zhadiger Saken.

## Run the project

No package installation or build step is needed. Extract the complete project folder, then open **[`dist/index.html`](dist/index.html)** in a current browser. This is the main page and contains Task 4. Start at [`dist/task0.html`](dist/task0.html) to follow the tasks in order.

Alternatively, if Python is installed, open a terminal in the project root and run:

```sh
python -m http.server 8000 --directory dist
```

Then open [http://localhost:8000](http://localhost:8000). Stop the server with `Ctrl+C`.

An internet connection is required to load Bootstrap CSS from [jsDelivr's Bootstrap 5.3.3 CDN](https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css), including when opening the pages locally. The stylesheet URL is pinned to version 5.3.3, and its Subresource Integrity (SRI) hash matches that exact version so the browser can check the downloaded file. Bootstrap is not bundled in this project. JavaScript must be enabled for custom validation, password confirmation, and the demonstration success messages.

## Project structure

```text
assignment4-frontend/
├── README.md
├── dist/
│   ├── index.html                 # Task 4: registration form; main page
│   ├── task0.html                 # Basic contact form
│   ├── task1.html                 # Native HTML5 validation
│   ├── task2.html                 # Bootstrap form styling
│   ├── task3.html                 # Bootstrap validation feedback
│   └── assets/
│       ├── app.js                 # Validation, feedback, password matching, reset
│       └── styles.css             # Simple Arial styling and responsive layout
└── screenshots/                  # Screenshots used in this report
```

The files in `dist/` are the editable source and runnable website. There is no separate compilation step.

## Part 1. Basic HTML Forms

### Task 0. Simple Contact Form

**Page:** [`dist/task0.html`](dist/task0.html)

The form contains a name text input, an email input, a multiline message `<textarea>`, and a submit button. Every field has a visible `<label>` whose `for` attribute matches the control's `id`. Clicking a label focuses its field. Task 0 keeps the controls simple; the additional required-field and length rules are introduced in Task 1.

![Task 0: basic contact form](screenshots/task0-basic.png)

### Task 1. Form with HTML5 Validation

**Page:** [`dist/task1.html`](dist/task1.html)

All three contact fields use `required`. The email control uses `type="email"`. The name has an 80-character maximum, the email a 254-character maximum, and the message requires 10–1,000 characters. These attributes are evaluated by the browser; this form retains native validation tooltips.

Try submitting the empty form, then enter a name and a message while using `zhadiger` as the email. Submission is blocked until the native constraints pass. The precise tooltip wording depends on the browser and its language.

![Task 1: contact form with HTML5 validation attributes](screenshots/task1-native.png)

![Task 1: native browser validation rejects invalid input](screenshots/task1-invalid.png)

## Part 2. Bootstrap Forms

### Task 2. Bootstrap Form Styling

**Page:** [`dist/task2.html`](dist/task2.html)

This version uses Bootstrap's `form-label`, `form-control`, `form-text`, and button classes. The form is a `row g-3`; name and email use `col-md-6`, while the message spans the full row. The two columns stack on smaller screens. Placeholders show example entries, and helper text explains the input requirements. The native HTML5 validation rules remain enabled.

![Task 2: Bootstrap contact form with columns, placeholders, and helper text](screenshots/task2-bootstrap.png)

### Task 3. Bootstrap Validation Styles

**Page:** [`dist/task3.html`](dist/task3.html)

The contact form adds `valid-feedback` and `invalid-feedback` messages below each field. JavaScript evaluates the HTML5 constraints and applies `is-valid` or `is-invalid` to the controls. The form uses `novalidate` so the browser's tooltip does not interrupt the custom inline feedback.

Submitting incomplete or incorrectly formatted entries shows errors and focuses the first invalid control. Once a field has been checked, its feedback updates as it is edited. Correcting the values and submitting displays green states and a demonstration success message.

![Task 3: invalid fields and inline error messages](screenshots/task3-invalid.png)

![Task 3: valid fields and success feedback](screenshots/task3-valid.png)

## Part 3. Advanced Form Project

### Task 4. Registration Form

**Page:** [`dist/index.html`](dist/index.html)

The final form includes first name, last name, email, password, confirmation, gender radio buttons, optional hobby checkboxes, a country dropdown, and submit and reset buttons. Bootstrap columns place related fields together on wider screens and stack them on phones.

The required fields use HTML5 constraints. Passwords require 8–72 characters. A JavaScript comparison uses `setCustomValidity()` to reject a confirmation that differs from the password. Whitespace-only first and last names are also rejected. Gender requires one radio selection: a missing selection shows red error feedback, which clears when an option is selected. Gender has no green success state or success message. The country placeholder has an empty value so a country must be chosen. Hobbies may be left unchecked or multiple choices may be selected.

The site has no password generator; the assignment requires password validation, not generation. HTML length constraints and the JavaScript confirmation check validate the entered values. Because the password fields use `autocomplete="new-password"`, the browser may independently suggest a generated password through its own password manager. See [MDN's autocomplete reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete#new-password).

Inline feedback explains errors and accepted values. Password inputs mask their contents. Reset restores the initial controls and removes validation classes, custom errors, and status messages. Labels, grouped controls, descriptive feedback associations, keyboard focus styles, a skip link, and a live status region support navigation and understanding.

![Task 4: registration form before entry](screenshots/task4-registration.png)

![Task 4: registration form with validation errors](screenshots/task4-invalid.png)

![Task 4: completed registration form with success feedback](screenshots/task4-valid.png)

![Task 4: responsive registration form on a mobile viewport](screenshots/task4-mobile.png)

## Work process

The implementation began with labeled HTML controls, then added native validation constraints. The next stage introduced Bootstrap form styling, helper text, and responsive columns. Shared JavaScript was added to show inline feedback while continuing to use the browser's constraint-validation API. The registration form combined these pieces and added matching passwords, radio and checkbox groups, a select control, and a full reset. The final stage checked the valid and invalid states, navigation, and layout, and collected the screenshots above.

## Validation and demonstration checklist

These examples can be repeated during the defense. Use test data rather than a real account password.

| Page / feature | Demonstration | Expected result |
| --- | --- | --- |
| Task 0 labels | Click the Name, Email, and Message labels | The corresponding control receives focus. |
| Task 1 required fields | Submit the empty form | The browser blocks submission and identifies a required field. |
| Task 1 email | Enter a name, `zhadiger` as email, and a message of at least 10 characters | The browser rejects the email format. |
| Task 1 message length | Type a message shorter than 10 characters, then submit | The browser rejects the short message. |
| Task 2 grid | Reduce the browser width below the medium breakpoint | Name and email stack vertically. |
| Task 3 invalid state | Enter a name, use `zhadiger` as email, and leave the message empty | The name is valid; email and message show inline errors. |
| Task 3 valid state | Use `Zhadiger Saken`, `zhadiger@example.com`, and `Hello, this is my test message.` | Green feedback and a demonstration success message appear. |
| Task 4 required fields | Submit an empty registration | Missing fields are highlighted; focus moves to the first error. |
| Task 4 name | Enter only spaces as a first or last name | A custom error asks for a meaningful value. |
| Task 4 password length | Type `short` as the password | The minimum-length constraint rejects it. |
| Task 4 confirmation | Enter two different passwords | The confirmation reports that passwords must match. |
| Task 4 password edits | Match the passwords, then change the first password | Confirmation is checked again and becomes invalid. |
| Task 4 choices | Leave gender and country unselected, then submit | Both required selections show errors. |
| Task 4 gender correction | Select a gender after the missing-selection error | The red error clears; no green success state or success message appears for gender. |
| Task 4 hobbies | Select multiple hobbies, or leave them all unchecked | Both choices are accepted; hobbies are optional. |
| Task 4 valid state | Use the sample values below and submit | A valid-registration message appears; no account is created. |
| Task 4 reset | After errors or a successful attempt, click Reset form | Values, feedback, and status return to the initial state. |
| Keyboard and mobile | Navigate with Tab and resize the page | Controls remain reachable and the layout fits the available width. |

Sample valid registration:

```text
First name:       Zhadiger
Last name:        Saken
Email:            zhadiger@example.com
Password:         Demo2538!
Confirm password: Demo2538!
Gender:           Any listed option
Hobbies:          Optional; for example Reading and Coding
Country:          Kazakhstan
```

`Demo2538!` is a demonstration value only. Email validation checks syntax, not whether the address exists. A valid password here means it passes the length and matching rules; this form does not assess account security.

## Defense study notes

- **Labels and names:** `id` connects a control to its label. `name` identifies a form value if it is submitted. A placeholder is an example, not a replacement for a label.
- **HTML5 constraints:** `required` rejects an empty required control; `type="email"` checks email syntax; `minlength` and `maxlength` define text length limits. The browser exposes results through each control's `validity` object.
- **Native and inline feedback:** Tasks 1 and 2 let the browser show native messages. Tasks 3 and 4 use `novalidate` to suppress those tooltips, then JavaScript calls `checkValidity()` and displays Bootstrap feedback. `novalidate` does not remove the constraint attributes.
- **Bootstrap classes:** `row`, `g-3`, and `col-md-6` arrange the form. `form-control`, `form-select`, and `form-check` style controls. `is-valid` and `is-invalid` choose states; the feedback elements provide explanations.
- **Password matching:** A nonempty confirmation that differs from the password receives a custom error. `setCustomValidity('')` clears the previous error before checking again so a corrected field can become valid.
- **Radio buttons and checkboxes:** Radios sharing `name="gender"` allow one selection. Checkboxes allow independent selections, so more than one hobby can be chosen. A `fieldset` and `legend` describe each group.
- **Submission and reset:** `preventDefault()` keeps the demo on the current page. `type="reset"` restores initial field values; the reset handler also clears the custom feedback state.
- **Practice changes:** Be ready to change the password minimum, add a new country or hobby, add a required phone field, or explain a Bootstrap grid class. Change the HTML constraint and its helper text together.

The assignment requires a defense at the practice lesson, including technical questions and live coding. Review the provided course resources and be able to explain and modify this implementation.

## Scope and limitations

This is a front-end demonstration. With JavaScript enabled, submissions are intercepted: form values are not transmitted to a server, written to browser storage, or used to create an account. Values exist only in the current page; normal browser autofill behavior is controlled by the browser. There is no database, email delivery, login, password hashing, or real authentication. A production service would also need server-side validation and an appropriate account system.

## Submit through GitHub

**Public repository:** [bigstep832/assignment4](https://github.com/bigstep832/assignment4)

1. Open the repository without signing in and confirm that this README renders, all ten screenshots are visible, and `dist/` contains the HTML, CSS, and JavaScript files. Check the pages with an internet connection so the Bootstrap CDN stylesheet can load.
2. Submit [this repository URL](https://github.com/bigstep832/assignment4) as the project URL in Moodle before the deadline shown there.
3. Attend the mandatory practice-lesson defense and prepare for the walkthrough and live coding.

GitHub Pages hosting is optional. The required submission is the public repository containing the complete project and this README. The website can be run locally from `dist/index.html` without deployment.

## References and third-party license

- [MDN: Your first form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form) — form controls and connected labels.
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation) — HTML5 constraints and JavaScript validation.
- [Bootstrap 5.3: Forms overview](https://getbootstrap.com/docs/5.3/forms/overview/) — form classes and controls.
- [Bootstrap 5.3: Validation](https://getbootstrap.com/docs/5.3/forms/validation/) — valid/invalid states and feedback elements.
- Course resource: Abitova G. A., *Web Technologies Front-End Development. Part 1* (2022).

Bootstrap 5.3.3 CSS is loaded from jsDelivr with a pinned version and matching SRI hash. Bootstrap is distributed under the MIT License; see the upstream [Bootstrap 5.3.3 copyright and license notice](https://github.com/twbs/bootstrap/blob/v5.3.3/LICENSE).
