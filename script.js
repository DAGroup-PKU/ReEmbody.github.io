document.getElementById('copy-citation')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(document.querySelector('#citation code').textContent);
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = 'Copy BibTeX'; }, 2000);
  } catch { button.textContent = 'Select citation above to copy'; }
});
