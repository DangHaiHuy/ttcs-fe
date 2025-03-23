import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import BoxUser from '../boxChat/BoxUser';
import ClickAwayListener from 'react-click-away-listener';
import useDebounce from '../../hooks/useDebounce';
import useUserServicePrivate from '../../services/useUserServicePrivate';

function Search() {
    const [listUser, setListUser] = useState([]);
    const [openBoxSearch, setOpenBoxSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const keySearchDebounce = useDebounce(searchKey, 1000);

    console.log(openBoxSearch)

    const { searchUserByKey } = useUserServicePrivate();

    useEffect(() => {
        const fetchData = async () => {
            if (!keySearchDebounce.trim()) {
                setListUser([]);
                return;
            }
            const res = await searchUserByKey(keySearchDebounce);
            if (!res) return;
            console.log(res?.result?.items);
            setListUser(res?.result?.items);
        };
        fetchData();
    }, [keySearchDebounce]);

    return (
        <div className="h-[60px] w-full fixed bg-slate-200 flex justify-center items-center shadow-lg z-40">
            <div className="w-[400px] rounded-[100px] h-[40px] bg-slate-100 flex">
                <ClickAwayListener
                    onClickAway={() => {
                        setOpenBoxSearch(false);
                    }}
                >
                    <div className="relative">
                        <input
                            className="w-[350px] rounded-[100px] h-[40px] px-[24px] outline-none bg-slate-100"
                            placeholder="Tìm kiếm"
                            onFocus={() => {
                                setOpenBoxSearch(true);
                            }}
                            value={searchKey}
                            onChange={(e) => {
                                setSearchKey(e.target.value);
                            }}
                        ></input>
                        {openBoxSearch &&
                            (listUser.length > 0 ? (
                                <div className="absolute top-full lefft-0 w-full bg-slate-100 mt-[6px] shadow-lg z-30">
                                    {listUser.map((user, index) => {
                                        return (
                                            <div>
                                                <BoxUser user={user}/>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="absolute top-full lefft-0 w-full bg-slate-100 mt-[6px] shadow-lg z-30 flex justify-center items-center py-[12px] text-slate-500">
                                    Không có kết quả
                                </div>
                            ))}
                    </div>
                </ClickAwayListener>
                <div className="flex-1 ">
                    <div className="relative flex justify-center items-center h-[40px] cursor-pointer hover:bg-slate-300 rounded-br-[100px] rounded-tr-[100px]">
                        <SearchOutlined />
                        <div className="absolute w-[1px] bg-slate-300 h-[30px] left-0"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
