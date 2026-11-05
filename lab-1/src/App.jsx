import ProfileCard from './components/ProfileCard.jsx'
import './App.css'

const profile = {
  name: 'Дарина',
  group: 'КН-312',
  technologies: ['React', 'TypeScript', 'Node.js'],
}

function App() {
  return (
    <main className="page">
      <ProfileCard
        name={profile.name}
        group={profile.group}
        technologies={profile.technologies}
      />
    </main>
  )
}

export default App
