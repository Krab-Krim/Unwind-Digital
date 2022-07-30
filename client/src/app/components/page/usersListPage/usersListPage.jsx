import React, {useEffect, useState} from "react";
import {Container, Image} from "react-bootstrap";
import Table from "react-bootstrap/Table";
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
        <Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>User name</th>
                    <th>User company</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Photos</th>
                </tr>
                </thead>
                {userPosts.map(({ result, photos, users }) => (
                        <tbody key={result.id}>
                        <tr>
                            <td>{users.name}</td>
                            <td>{users.company.name}</td>
                            <td>{result.title}</td>
                            <td>{result.body}</td>
                            <td>
                                <Image
                                    src={photos.url}
                                    style={{ width: "150px", height: "150px" }}
                                />
                            </td>
                        </tr>
                        </tbody>
                    )
                )}
            </Table>
        </Container>
    );
};

export default UsersListPage;
