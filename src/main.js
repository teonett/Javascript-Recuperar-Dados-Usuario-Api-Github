var axios = require('axios');
var urlBase = 'https://api.github.com';

class App {

    constructor(){

        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event) {

        event.preventDefault();

        const repoInput = this.inputEl.value;

        if (repoInput.length === 0)
            return;

        var response = axios.get(urlBase + `/users/${repoInput}`)
        .then(function(response){
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.data.name);
        });

        let res = await axios.get(urlBase + `/users/${repoInput}`);

        this.repositories.push({
            name: res.data.name,
            description: res.data.bio,
            avatar_url: res.data.avatar_url,
            html_url: res.data.html_url,
            location: res.data.location,
        });

        this.render();

    }

    render() {

        this.listEl.innerHTML ='';
     
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url)

            let titEl = document.createElement('strong');
            titEl.appendChild(document.createTextNode(repo.name));

            let descEl = document.createElement('p');
            descEl.appendChild(document.createTextNode(repo.description));

            let loccEl = document.createElement('p');
            loccEl.appendChild(document.createTextNode(repo.location));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titEl);
            listItemEl.appendChild(descEl);
            listItemEl.appendChild(loccEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);

        });
    };

}

new App();