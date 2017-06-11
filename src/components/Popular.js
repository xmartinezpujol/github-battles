import React from 'react';
import Api from '../utils/api';

function RepoGrid (props) {
  return (
    <div className='repo-wrapper'>
      <ul className='popular-list'>
        {props.repos.map(function(repo, index) {
          return (
            <li key={repo.name} className='popular-item' >
              <div className='popular-rank'>#{index + 1}</div>
                <ul className='space-list-items'>
                  <li>
                    <img
                      className='avatar'
                      src={repo.owner.avatar_url}
                      alt={'Avatar for' + repo.owner.login}
                    />
                  </li>
                  <li><a href={repo.html_url}>{repo.name}</a></li>
                  <li>@{repo.owner.login}</li>
                  <li>{repo.stargazers_count} ⭐</li>
                </ul>
          </li>
          )
        })}
      </ul>
    </div>
  )
}

function SelectedLanguage(props) {

  var languages = ['All', 'Javascript', 'Ruby', 'CSS', 'Python'];

  return (
    <ul className='languages'>
    {languages.map((lang) => {
      return (
        <li
        style={lang === props.selectedLanguage ? { color: 'red'} : null }
        onClick={props.onSelect.bind(null, lang)}
        key={lang}>
        {lang}
        </li>
      )
    })}
    </ul>
  )
}

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    Api.fetchPopularRepos(lang)
      .then(function(repos) {
        this.setState(function() {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  render(){

    return (
      <div>
        <SelectedLanguage
        selectedLanguage={this.state.selectedLanguage}
        onSelect={this.updateLanguage} />
        {!this.state.repos
          ? <p className='mess-loading'>LOADING...</p>
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

export default Popular;
