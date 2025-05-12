const LoadingFullScreen = (params: any) => {
    const styles: any = {
        loaderContainer: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column', // Thay đổi thành dọc
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            borderRadius: '9px'
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '8px solid rgba(255, 255, 255, 0.3)',
            borderTop: '8px solid #fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px', // Tạo khoảng cách giữa spinner và nội dung
        },
        // Keyframes cho hiệu ứng quay
        '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
        content: {
            color: 'white',
            fontSize: '18px',
            textAlign: 'center',
        }
    };

    return (
        <div style={styles.loaderContainer}>
            <div style={styles.spinner}></div>
            {params.content && <h5 style={styles.content}>{params.content}</h5>}
        </div>
    );
};

export default LoadingFullScreen;
