import { ConfigProvider } from 'antd';

function ConfigAntd({ children }) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        hoverBorderColor: 'none',
                        activeBorderColor: 'none',
                        activeBg: '#E2E8F0',
                        hoverBg: 'none',
                        groupBorderColor: '#E2E8F0',
                    },
                    // Table: {
                    //     headerBg: '#0284c7',
                    //     headerColor:'white',
                    //     rowHoverBg:'none',
                    //     headerFilterHoverBg:'none',
                    //     headerSortActiveBg:'none'
                    // },
                },
                token: {
                    colorPrimary: '#0284c7',
                    fontFamily: 'Kanit, sans-serif !important',
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}

export default ConfigAntd;
