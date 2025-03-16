import clsx from 'clsx';
import { useState } from 'react';
import ChangePassword from './ChangePassword';
import ListBlockedUser from './ListBlockedUser';

function Setting() {
    const [selectBtn, setSelectBtn] = useState(0);
    const listBtns = [
        {
            name: 'Đổi mật khẩu',
            component: <ChangePassword />,
        },
        // {
        //     name: 'Danh sách chặn',
        //     component: <ListBlockedUser />,
        // },
    ];
    return (
        <div className="min-h-screen bg-slate-300 px-[40px] py-[40px] flex flex-col">
            <div className="relative">
                <h1 className="text-3xl">Cài đặt</h1>
                <div className="absolute w-full h-[2px] bg-primary top-full"></div>
            </div>
            <div className="flex mt-[40px] flex-1">
                <div className="w-[200px] relative flex flex-col">
                    {listBtns.map((btn, index) => {
                        return (
                            <div
                                className={clsx('px-[12px] py-[8px] relative cursor-pointer hover:text-primary', {
                                    ['text-primary']: index === selectBtn,
                                })}
                                onClick={() => {
                                    setSelectBtn(index);
                                }}
                                key={index}
                            >
                                {btn.name}
                                <div
                                    className={clsx('absolute h-full w-[1px] top-0 left-0 bg-slate-400', {
                                        ['!bg-primary']: index === selectBtn,
                                        ['!w-[2px]']: index === selectBtn,
                                    })}
                                ></div>
                            </div>
                        );
                    })}
                    <div className="absolute w-[2px] bg-primary h-full top-0 right-0"></div>
                </div>
                {/* phải có overflow-x-auto */}
                <div className="flex-1 px-[40px] relative overflow-x-auto"> 
                    {listBtns.map((btn, index) => {
                        if (index === selectBtn) return <div key={index}>{btn.component}</div>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Setting;
