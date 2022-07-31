import React, {useEffect, useState} from "react";
import getRandomNumber from "../../../utils/getRandomNumber";

const UsersListPage = () => {
    const getData = type => fetch(`https://jsonplaceholder.typicode.com/${type}`).then(r => r.json());
    const [data, setData] = useState([]);
    const pageSize = getRandomNumber(5, 15);

    useEffect(() => {
        Promise
            .all([ "posts", "photos", "users" ].map(getData))
            .then(([ posts, photos, users]) => {
                const photosObj = Object.fromEntries(photos.map(n => [ n.albumId, n ]));
                let result = [...posts].reduce((a, c) => (a.map(e=>e.userId).includes(c.userId) || a.push(c), a), []);
                const usersObj = Object.fromEntries(users.map(n => [ n.id, n ]));
                setData(result.map(n => ({
                    result: n,
                    photos: photosObj[n.userId],
                    users: usersObj[n.userId],
                })));
            });
    }, []);

    const userPosts = data.slice(pageSize)

    return (
        <div className="usersListPage-container">
            {userPosts.map(({ result, photos, users }) => (
                <div className="usersListPage-column" key={result.id}>
                    <div className="usersListPage-column-card">
                        <div className="usersListPage-column-card-info">
                            <div className="usersListPage-column-card-info-user">
                                <div className="usersListPage-column-card-info-user-img">
                                    <img
                                        src={photos.url}
                                        alt="imgUser"
                                    />
                                </div>
                                <div className="usersListPage-column-card-info-user-text">
                                    <div className="usersListPage-column-card-info-user-text-author">
                                        Author: {users.name}
                                    </div>
                                    <div className="usersListPage-column-card-info-user-text-company">
                                        Company: {users.company.name}
                                    </div>
                                </div>
                            </div>

                            <div className="usersListPage-column-card-info-title">
                                Title: {result.title}
                            </div>
                            <div className="usersListPage-column-card-info-body">
                                {result.body}
                            </div>
                        </div>
                    </div>
                </div>
                )
            )}
                {/*<div className="usersListPage-column">2</div>*/}

            {/*<table>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>User name</th>*/}
            {/*        <th>User company</th>*/}
            {/*        <th>Title</th>*/}
            {/*        <th>Body</th>*/}
            {/*        <th>Photos</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    {userPosts.map(({ result, photos, users }) => (*/}
            {/*            <tbody key={result.id}>*/}
            {/*            <tr>*/}
            {/*                <td>{users.name}</td>*/}
            {/*                <td>{users.company.name}</td>*/}
            {/*                <td>{result.title}</td>*/}
            {/*                <td>{result.body}</td>*/}
            {/*                <td>*/}
            {/*                    <img*/}
            {/*                        src={photos.url}*/}
            {/*                        style={{ width: "150px", height: "150px" }}*/}
            {/*                    />*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        )*/}
            {/*    )}*/}
            {/*</table>*/}
        </div>
    );
};

export default UsersListPage;
