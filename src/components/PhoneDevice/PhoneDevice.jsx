import './PhoneDevice.styles.css'

function PhoneDevice({ justify, align, direction, gap, children }) {
    const now = new Date();
    const hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    const currentTime = `${hours}:${minutes}`;

    return <div
        className="phone-device"
        style={{
            justifyContent: justify,
            alignItems: align,
            flexDirection: direction,
            gap: gap
        }}>
        <time className='phone-time'>{currentTime}</time>
        {children}
    </div>
}

export default PhoneDevice;