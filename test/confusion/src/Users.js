import React, { useEffect, useState } from "react";
// import "Users.css"
export default function Users() {
    // API
    const url = "http://firstrealestate-001-site1.anytempurl.com/api/admin/getAllAccount";
    const [sorted, setSorted] = useState({ sorted: "id", resersed: false })

    const [users, setUsers] = useState([]);
    // const [email, setEmail] = useState([]);
    function fetchUsers() {
        fetch(url)
            .then((res => res.json()))
            .then((data => setUsers(data)))

    }

    useEffect(() => {

        fetchUsers();
    }, []);
// sort data
    const sortById = () => {
        setSorted({ sorted: "id", resersed: !sorted.resersed });
        const userCopy = [...users];
        userCopy.sort((userA, userB) => {
            if (sorted.resersed) {
                return userB.id - userA.id;
            } return userA.id - userB.id;

        });
        setUsers(userCopy);


    }

    // const sortByName = () => {
    //     setSorted({ sorted: "username", resersed: !sorted.resersed });
    //     const userCopy = [...users];
    //     userCopy.sort((userA, userB));
    //     const nameA = userA.username.toUppercase();
    //     const nameB = userB.username.toUppercase();
    //     if (sorted.resersed) {
    //         return nameB.localCompare(nameA);
    //     }
    //     return nameA.localCompare(nameB);
    // }
    // setUsers(userCopy);

    //filter 

    const [filterCriteria, setFilterCriteria] = useState()
   
    function fetchUsers(){
        const filterParams = `?email= ${filterCriteria.email} & role = ${filterCriteria.role}`;
        
    }



    return (
        <div className="">
            <h1>Quản lí tài khoản</h1>
            <button>Tìm kiếm sản phẩm</button><br></br>
            <input type="text" placeholder="Nhập email" onClick={filterCriteria}></input>
            <input type="text" placeholder="Vai trò"></input>
            <button >Tìm kiếm</button>

            <div className="">
                <h1>Bảng kết quả tìm kiếm</h1>
                <table>
                    <tr className="headtb">
                        <th onClick={sortById}>ID</th>
                        <th onClick={sortById}>RoleId</th>
                        <th onClick={sortById}>Username</th>
                        <th onClick={sortById}>Password</th>
                        <th onClick={sortById}>CreateAt</th>
                        <th onClick={sortById}>UpdateAt</th>
                        <th onClick={sortById}>PhoneNumber</th>
                        <th onClick={sortById}>Email</th>
                        <th onClick={sortById}>Address</th>
                        <th onClick={sortById}>Status</th>
                        <th onClick={sortById}>Role</th>

                    </tr>

                    {users.map((user) => {
                        return (
                            <tr style={{ textAlign: "center" }}>
                                <td>{user.id}</td>
                                <td>{user.roleId}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.createAt}</td>
                                <td>{user.updateAt}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.status ? "Đang hoạt động" : "Tạm ngưng"}</td>
                                <td>{user.role}
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>

                            </tr>
                        )


                    })}
                </table>

            </div>

        </div>

    )


}