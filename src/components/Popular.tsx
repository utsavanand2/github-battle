import React, { Component } from 'react';
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
type LangProp = {
    selected: string,
    onUpdateLanguage: (language: string) => void
}

type GridProp = {
    repos: object[]
}

type MyState = {
    selectedLanguage: string,
    repos: { [key: string]: object[] },
    error: string | null
}

function LanguagesNav({ selected, onUpdateLanguage }: LangProp) {
    const languages: string[] = ["All", "TypeScript", "Java", "GoLang", "Python"]
        return(
            <ul className='flex-center'>
                {languages.map((language) => {
                    return <li key={language}>
                        <button className='btn-clear nav-link'
                                style={language === selected ? { color: 'rgb(187, 46, 31)'}: {}}
                                onClick={() => onUpdateLanguage(language)}
                        >
                            {language}
                        </button>
                    </li>
                })}
            </ul>
        );
}

function ReposGrid(props: GridProp) {
    const repos = props.repos
    return(
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const { owner, html_url, stargazers_count, forks, open_issues } : any = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url} className='repo bg-light'>
                        <h4 className='header-lg center-text'>
                            #{index + 1}
                        </h4>
                        <img
                            className='avatar'
                            src={avatar_url}
                            alt={`Avatar for ${login}`}
                        />
                        <h2 className='center-text'>
                            <a className='link' href={html_url}>{login}</a>
                        </h2>

                        <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22}/>
                                <a href={`https://github.com/${login}`}>{login}</a>
                            </li>
                            <li>
                                <FaStar color='rgb(255, 215, 0)' size={22}/>
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129, 195, 245)' size={22}/>
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22}/>
                                {open_issues.toLocaleString()} open
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

class Popular extends Component<any, MyState>{
    constructor(props: any) {
        super(props)

        this.state = {
            selectedLanguage: "All",
            repos: {},
            error: null,
        }

        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentWillMount() {
        document.title = "Popular Repos"
    }
    
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(selectedLanguage: string) {
        this.setState({
            selectedLanguage: selectedLanguage,
            error: null
        })

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch((error) => {
                    console.warn("Error fetching repos: ", error)
                    this.setState({
                        error: "There was an error fetching the repositories"
                    })
                })
        }
        
    }

    isLoading() { 
        const { selectedLanguage, repos, error } = this.state

        return !repos[selectedLanguage] && error === null
    }

    render() {
        const {selectedLanguage, repos, error } = this.state
        return(
            <React.Fragment>
                <LanguagesNav
                selected={selectedLanguage}
                onUpdateLanguage={this.updateLanguage}/>

                { this.isLoading() && <p>Loading...</p> }

                { error && <p>{error}</p> }

                { repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}></ReposGrid>}
            </React.Fragment>
        )
    }
}

export default Popular;