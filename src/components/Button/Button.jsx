import './Button.styles.css';

function Button({ children, onClick, variant, size = 'single' }) {
    return (
        <button className={`button ${variant} ${size}`}
            onClick={onClick}
            type='button'
            color={variant}>
            {children}
        </button >
    );
};

export default Button;