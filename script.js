document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('starred-list');
  const errorMessage = document.getElementById('error-message');

  fetch('events.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load events.json: ${response.status}`);
      }
      return response.json();
    })
    .then(repos => {
      if (!Array.isArray(repos) || repos.length === 0) {
        list.innerHTML = '<li>No starred repositories found.</li>';
        return;
      }

      list.innerHTML = repos
        .map(repo => `
          <li class="repo-card">
            <h2><a href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h2>
            <p class="repo-description">${repo.description}</p>
            <p class="repo-meta">${repo.language} · ★ ${repo.stars.toLocaleString()} · Starred on ${new Date(repo.starred_at).toLocaleDateString()}</p>
          </li>
        `)
        .join('');
    })
    .catch(error => {
      errorMessage.textContent = error.message;
    });
});
