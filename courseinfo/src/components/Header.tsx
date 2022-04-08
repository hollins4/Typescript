interface courseNameProps {
    name: string
}

const Header = ({ name }: courseNameProps ) => {
    return (
        <h3>{name}</h3>
    )
}

export default Header