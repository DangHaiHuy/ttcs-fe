import { UsergroupAddOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useUserServicePrivate from '../../services/useUserServicePrivate';
import useUserSearchHistoryService from '../../services/useUserSearchHistoryService';
import { useDispatch, useSelector } from 'react-redux';
import { toggleReloadHistorySelector } from '../../redux/selector';
import { setKeySearchAction } from '../../redux/action/chatAction';

function SearchBar({ setUserSearchList, setSearchMode, searchMode, setListUserSearchHistory, setHistorySearchMode }) {
    const [keySearch, setKeySearch] = useState('');
    const keySearchDebounce = useDebounce(keySearch, 1000);
    const { searchUserByKey } = useUserServicePrivate();
    const { getListUserSearchHistory } = useUserSearchHistoryService();
    const toggleReloadHistory = useSelector(toggleReloadHistorySelector);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (keySearchDebounce.length === 0) {
                setHistorySearchMode(true);
                return;
            }
            setHistorySearchMode(false);
            const res = await searchUserByKey(keySearchDebounce);
            if (!res) return;
            setUserSearchList(res?.result.items);
            setSearchMode(true);
        };
        dispatch(setKeySearchAction(keySearchDebounce));
        fetchData();
    }, [keySearchDebounce]);

    useEffect(() => {
        const fetchHistoryData = async () => {
            const res = await getListUserSearchHistory();
            if (!res) return;
            setListUserSearchHistory(res?.result?.items);
        };
        fetchHistoryData();
    }, [toggleReloadHistory]);

    return (
        <div className="h-[60px] bg-slate-100 flex items-center">
            <div className="px-[8px] flex w-full">
                <Search
                    placeholder="Tìm kiếm"
                    className="flex-1"
                    value={keySearch}
                    onChange={(e) => {
                        setKeySearch(e.target.value);
                    }}
                    onSearch={() => {
                        console.log('hello');
                    }}
                    onFocus={() => {
                        setSearchMode(true);
                    }}
                    allowClear
                />
                {!searchMode ? (
                    <>
                        {/* <div className="flex items-center justify-center cursor-pointer hover:bg-slate-200 ml-[4px] w-[50px]">
                        <UsergroupAddOutlined />
                    </div> */}
                    </>
                ) : (
                    <div
                        className="flex items-center justify-center cursor-pointer hover:bg-slate-200 ml-[4px] w-[50px]"
                        onClick={() => {
                            setSearchMode(false);
                        }}
                    >
                        Đóng
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
