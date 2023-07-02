const Persons = ({ displayPersons }) => {
    return (
        <>
            <ul>
                { displayPersons() }
            </ul>
        </>
    )
}

export default Persons