export default function Footer() {

    const currDate = new Date().getFullYear();

    return(
        <div>
            <p>© {currDate} Futspring, All rights deserved.</p>
        </div>
    )
}