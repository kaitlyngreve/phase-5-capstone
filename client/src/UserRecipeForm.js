import { useState } from 'react'

function UserRecipeForm({ handleNewUserRecipe, user, cuisines }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [measurementsIngredients, setMeasurementsIngredients] = useState("")
    const [directions, setDirections] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    // const [username, setUsername] = useState("")
    const [cuisine, setCuisine] = useState("")


    const [isFormClicked, setIsFormClicked] = useState(false)

    const handleFormClick = () => {
        setIsFormClicked(isFormClicked => !isFormClicked)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/recipes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                measurements_ingredients: measurementsIngredients,
                directions: directions,
                img_url: imgUrl,
                user_id: user.id,
                cuisine_id: cuisine
            })
        })
            .then(r => r.json())
            .then(data => handleNewUserRecipe(data))

        setTitle("")
        setDescription("")
        setMeasurementsIngredients("")
        setDirections("")
        setImgUrl("")
        setIsFormClicked(false)
    }


    return (
        <div>
            {isFormClicked ?
                <form onSubmit={handleSubmit} className="form-container">
                    <h4 className="form-header">Create New Recipe</h4>
                    <label className="form-label">Recipe Title:
                        <input
                            className="form-inputs"
                            type="text"
                            placeholder='Recipe Title'
                            value={title}
                            onChange={e => setTitle(e.target.value)}>
                        </input>
                    </label>
                    <label>
                        Description
                        <input
                            className="form-inputs"
                            type="text"
                            placeholder='...'
                            value={description}
                            onChange={e => setDescription(e.target.value)}>
                        </input>
                    </label>
                    <label>
                        Ingredients
                        <input
                            className="form-inputs"
                            type="text"
                            placeholder='Ingredients & Measurements'
                            value={measurementsIngredients}
                            onChange={e => setMeasurementsIngredients(e.target.value)}>
                        </input>
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        Directions
                        <input
                            className="form-inputs"
                            type="text"
                            placeholder='...'
                            value={directions}
                            onChange={e => setDirections(e.target.value)}>
                        </input>
                    </label>
                    <label>
                        Image
                        <input
                            className="form-inputs"
                            type="text"
                            placeholder='Food Image'
                            value={imgUrl}
                            onChange={e => setImgUrl(e.target.value)}>
                        </input>
                    </label>
                    <label>
                        Cuisine
                        <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
                            <option>Select Cuisine</option>
                            {cuisines.map((cuisine) => (
                                <option value={cuisine.id}>{cuisine.cuisine_type}</option>
                            ))}
                        </select>
                    </label>
                    <button>Add Recipe to Box</button>
                </form> : <h1 className='plus-sign' onClick={handleFormClick}> + </h1>}
        </div>
    )
}

export default UserRecipeForm;

