'use strict';

document.querySelectorAll('form[data-mode]').forEach((form) => {
  const custom = form.dataset.mode === 'custom';
  const fields = [...form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), textarea, select')];
  const status = form.querySelector('.form-status') || form.parentElement.querySelector('.form-status');
  const password = form.querySelector('#password');
  const confirmation = form.querySelector('#confirm-password');

  function showStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.dataset.kind = kind;
    status.hidden = false;
  }


  function updateConstraints() {
    fields.forEach((field) => {
      field.setCustomValidity('');
      if (field.hasAttribute('data-trim') && field.value && !field.value.trim()) {
        field.setCustomValidity(`${field.dataset.label || 'This field'} cannot contain only spaces.`);
      }
    });
    if (confirmation && confirmation.value && confirmation.value !== password.value) {
      confirmation.setCustomValidity('Passwords must match.');
    }
  }

  function errorMessage(field) {
    const label = field.dataset.label || 'This field';
    if (field.validity.customError) return field.validationMessage;
    if (field.validity.valueMissing) return field.tagName === 'SELECT' ? 'Please select a country.' : `${label} is required.`;
    if (field.validity.typeMismatch) return 'Enter a valid email address, such as you@example.com.';
    if (field.validity.tooShort) return `Use at least ${field.minLength} characters.`;
    if (field.validity.tooLong) return `Use no more than ${field.maxLength} characters.`;
    return field.validationMessage || 'Please check this field.';
  }

  function paintField(field) {
    const valid = field.validity.valid;
    field.classList.toggle('is-valid', valid);
    field.classList.toggle('is-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
    const feedback = document.getElementById(`${field.id}-invalid`);
    if (feedback && !valid) feedback.textContent = errorMessage(field);
    return valid;
  }

  function paintRadioGroup(group) {
    const radios = [...group.querySelectorAll('input[type="radio"]')];
    const valid = radios.some((radio) => radio.checked);
    radios.forEach((radio) => {
      radio.classList.toggle('is-invalid', !valid);
      radio.setAttribute('aria-invalid', String(!valid));
    });
    const error = group.querySelector('.invalid-feedback');
    error.hidden = valid;
    error.classList.toggle('d-block', !valid);
    return valid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (custom) {
      form.dataset.submitted = 'true';
      updateConstraints();
      fields.forEach(paintField);
      form.querySelectorAll('[data-required-group]').forEach(paintRadioGroup);
      if (!form.checkValidity()) {
        showStatus('Please check the highlighted fields and try again.', 'error');
        form.querySelector('.is-invalid')?.focus();
        return;
      }
    }
    
    showStatus(form.dataset.success || 'Form completed. This is a front-end demonstration.', 'success');
  });

  if (custom) {
    fields.forEach((field) => {
      field.addEventListener('blur', () => {
        field.dataset.touched = 'true';
        updateConstraints();
        paintField(field);
      });
      field.addEventListener('input', () => {
        if (status) status.hidden = true;
        updateConstraints();
        if (form.dataset.submitted || field.dataset.touched) paintField(field);
        if (field === password && (confirmation.dataset.touched || form.dataset.submitted)) paintField(confirmation);
      });
      field.addEventListener('change', () => {
        updateConstraints();
        if (form.dataset.submitted || field.dataset.touched) paintField(field);
      });
    });
    form.querySelectorAll('[data-required-group]').forEach((group) => {
      group.addEventListener('change', () => {
        paintRadioGroup(group);
        if (status) status.hidden = true;
      });
    });
  } else {
    form.addEventListener('input', () => { if (status) status.hidden = true; });
  }

  form.addEventListener('reset', () => {
    delete form.dataset.submitted;
    form.querySelectorAll('input, textarea, select').forEach((field) => {
      field.classList.remove('is-valid', 'is-invalid');
      field.removeAttribute('aria-invalid');
      delete field.dataset.touched;
      field.setCustomValidity('');
    });
    form.querySelectorAll('[data-required-group] .invalid-feedback').forEach((feedback) => {
      feedback.hidden = true;
      feedback.classList.remove('d-block');
    });
    if (status) { status.hidden = true; status.textContent = ''; }
  });
});
