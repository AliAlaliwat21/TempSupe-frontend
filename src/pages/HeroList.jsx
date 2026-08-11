import { Link } from "react-router"
const HeroList = ({heroes, isLoading})=>{

    if (isLoading) return <p>Loading...</p>

    return (
        <>
            <main>
                <h1>The Seven</h1> 
                {heroes.map((hero)=>(
                    <div key={hero._id}>
                        <h3>
                            <Link to={`heroes/${hero._id}`} >{hero.name}</Link>
                        </h3>
                        <p>{hero.biography}</p>
                        {hero.image && (<img src={hero.image} alt={hero.name} />)}
                    </div>
                ))}
            </main>
        </>
    )
}
export default HeroList