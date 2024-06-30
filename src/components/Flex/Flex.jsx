import './Flex.styles.css';

function Flex({ justify, align, gap, direction, children }) {
    return <div className='flex'
        style={{
            justifyContent: justify,
            alignItems: align,
            flexDirection: direction,
            gap: gap
        }}>
        {children}
    </div>
};

export default Flex;