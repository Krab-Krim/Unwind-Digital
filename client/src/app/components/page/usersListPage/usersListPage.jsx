import React, {useEffect, useState} from "react";
import {Container, Image} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import getRandomInt from "../../../utils/getRandomInt";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";

const UsersListPage = () => {
    const getData = type => fetch(`https://jsonplaceholder.typicode.com/${type}`).then(r => r.json());
    const [data, setData] = useState([]);
    // const [postsId, setPostsId] = useState(0);
    // const [photosId, setPhotosId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = getRandomInt(5, 15);
    let count;
    let usersCrop;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (data) {
        count = data.length;
        usersCrop = paginate(data, currentPage, pageSize);
    }

    useEffect(() => {
        // let post = getRandomInt(1,10);
        // if (post === 1) {
        //     console.log("1")
        //     let a = getRandomInt(1,10);
        //     let b = getRandomInt(1,50);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 2) {
        //     console.log("2")
        //     let a = getRandomInt(11,20);
        //     let b = getRandomInt(51,100);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 3) {
        //     console.log("3")
        //     let a = getRandomInt(21,30);
        //     let b = getRandomInt(101,150);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 4) {
        //     console.log("4")
        //     let a = getRandomInt(31,40);
        //     let b = getRandomInt(151,200);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 5) {
        //     console.log("5")
        //     let a = getRandomInt(41,50);
        //     let b = getRandomInt(201,250);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 6) {
        //     console.log("6")
        //     let a = getRandomInt(51,60);
        //     let b = getRandomInt(251,300);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 7) {
        //     console.log("7")
        //     let a = getRandomInt(61,70);
        //     let b = getRandomInt(301,350);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 8) {
        //     console.log("8")
        //     let a = getRandomInt(71,80);
        //     let b = getRandomInt(351,400);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 9) {
        //     console.log("9")
        //     let a = getRandomInt(81,90);
        //     let b = getRandomInt(401,450);
        //     setPostsId(a);
        //     setPhotosId(b);
        // } else if (post === 10) {
        //     console.log("10")
        //     let a = getRandomInt(91,100);
        //     let b = getRandomInt(451,500);
        //     setPostsId(a);
        //     setPhotosId(b);
        // }
        Promise
            .all([ "posts", "photos", "users" ].map(getData))
            // .all([ `posts?userId=${post}&id=${postsId}`, `photos?albumId=${post}&id=${photosId}`, `users?id=${post}` ].map(getData))
            .then(([ posts, photos, users]) => {
                const photosObj = Object.fromEntries(photos.map(n => [ n.albumId, n ]));
                const usersObj = Object.fromEntries(users.map(n => [ n.id, n ]));
                setData(posts.map(n => ({
                    post: n,
                    photos: photosObj[n.userId],
                    users: usersObj[n.userId],
                })));
            });
    }, []);

    console.log("data", data);

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
                {usersCrop.map(({ post, photos, users }) => (
                        <tbody key={post.id}>
                        <tr>
                            <td>{users.name}</td>
                            <td>{users.company.name}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Container>
    );
};

export default UsersListPage;
