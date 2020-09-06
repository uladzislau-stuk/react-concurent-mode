import React, {
	useState,
	useEffect
} from "react";

import { fetchUser, fetchPosts } from "./fakeApi";

function ProfilePage() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetchUser().then(u => setUser(u));
	}, []);

	if (user === null) {
		return <p>Loading profile...</p>;
	}
	return (
		<>
			<h1>{user.name}</h1>
			<ProfileTimeline />
		</>
	);
}

function ProfileTimeline() {
	const [posts, setPosts] = useState(null);

	useEffect(() => {
		fetchPosts().then(p => setPosts(p));
	}, []);

	if (posts === null) {
		return <h2>Loading posts...</h2>;
	}
	return (
		<ul>
			{posts.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	);
}

export default ProfilePage


// workaround
// export default function () {
// 	return (
// 		<>
// 			<ProfilePage />
// 			<ProfileTimeline />
// 		</>
// 	)
// }