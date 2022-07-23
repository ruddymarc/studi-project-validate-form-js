(() => {
  const constraintsText = {
    name: 'Le nom d\'un utilisateur ne peut contenir plus de 30 caractères et ne doit contenir que des lettres.',
    email: 'Il doit s\'agir d\'un e-mail valide.',
    phoneNumber: 'Il doit s\'agir d\'un numéro de téléphone européen.',
    category: 'Veuillez choisir une catégorie s\'il-vous plais.',
    message: 'Le message ne peut excéder plus de 200 caractères.'
  }
  const constraintsRegex = {
    name: /^[a-zA-Z-éèëï]{3,30}$/, // Acept : Gérémie, Noël, Jean-petit
    email: /^[\w.-]+@([\w-]+\.)[\w]{2,3}$/, // Acept : contact.service@domain.com
    phoneNumber: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    category: /^[a-z-]+$/ // Acept : snake-format
  }
  // DOM Elements
  const form = document.getElementById('contact-form')
  const formFields = Array.from(form.elements)
  // Validate form before submiten
  form.addEventListener('submit', (e) => {
    const helper = document.getElementsByClassName('help-text')
    const errors = Array.from(helper, (help) => { return help.textContent }).filter(content => { return !(content === 'undefined' || content === '' || content === null) })
    if (errors.length) {
      e.stopPropagation()
      e.preventDefault()
      window.alert('Le formumaire ne peu être transmis car il contient des erreurs! \n\nVeillez renseigner toutes les information utils, s\'il vous-plais.')
    }
  })
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
        helper.classList.add('fade')
      })
      input.addEventListener('blur', () => {
        helper.classList.remove('fade')
      })
      // Remove helper when fields is valid
      input.addEventListener('input', () => {
        if (input.name === 'message') {
          const maxLength = 200
          helper.innerText = !(input.value.length < maxLength) ? constraintsText[input.name] : ''
        } else {
          helper.innerText = !constraintsRegex[input.name].test(input.value) ? constraintsText[input.name] : ''
        }
      })
    }
  })
})()
