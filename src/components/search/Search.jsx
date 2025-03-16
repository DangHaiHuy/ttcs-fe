import { SearchOutlined } from '@ant-design/icons';

function Search() {
    return (
        <div
            className="h-[60px] w-full fixed bg-slate-200 flex justify-center items-center shadow-lg z-40"
        >
            <div className="w-[400px] rounded-[100px] h-[40px] bg-slate-100 flex">
                <input
                    className="w-[350px] rounded-[100px] h-[40px] px-[24px] outline-none bg-slate-100"
                    placeholder="Tìm kiếm"
                ></input>
                <div className="flex-1 ">
                    <div className="relative flex justify-center items-center h-[40px] cursor-pointer hover:bg-slate-300 rounded-br-[100px] rounded-tr-[100px]">
                        <SearchOutlined />
                        <div className='absolute w-[1px] bg-slate-300 h-[30px] left-0'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
