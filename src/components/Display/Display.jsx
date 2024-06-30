import './Display.styles.css';

function Display({ fontSize, value }) {
    return <div className='display' style={{ fontSize }}>{value}</div>
}

export default Display;