(() => {
  const constraintsText = {
    name: 'name.helper',
    email: 'email.helper',
    phoneNumber: 'phoneNumber.helper',
    category: 'category.helper',
    message: 'message.helper',
  }
  // DOM Elements
  const form = document.getElementById('contact-form')
  const formFields = Array.from(form.elements)
  // Add and shown helper when fields is focus
  formFields.forEach(input => {
    // Discart un-tracked inputs
    if (!(input.type === 'submit' || input.type === 'radio')) {
      // Add helper before fields
      const helper = document.createElement('span')
      const content = document.createTextNode(constraintsText[input.name])
      helper.classList.add('help-text')
      helper.appendChild(content)
      form.insertBefore(helper, input)
      // Shown helper when form fields is focus
      input.addEventListener('focus', () => {
        helper.style.display = 'block'
      })
      input.addEventListener('blur', () => {
        helper.style.display = 'none'
      })
    }
  })
})()
