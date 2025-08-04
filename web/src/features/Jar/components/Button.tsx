interface AddButtonProps {
    onClick?: () => void
}

function AddButton({ onClick }: AddButtonProps) {
    return (
        <button onClick={onClick} className="cursor-pointer ml-[20px] py-2 px-10 rounded-[30px] bg-violet-500 text-lg">Add</button>
    )
}

export default AddButton;