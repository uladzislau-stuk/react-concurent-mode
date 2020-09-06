import React, {
	useState,
	useEffect
} from "react";
import { fetchProfileData } from "./fakeApi";

// Kick off fetching as early as possible
const promise = fetchProfileData();

function ProfilePage() {
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState(null);

	useEffect(() => {
		promise.then(data => {
			setUser(data.user);
			setPosts(data.posts);
		});
	}, []);

	if (user === null) {
		return <p>Loading profile...</p>;
	}

	if (user && user.error) {
		return <p>Error profile...</p>;
	}

	return (
		<>
			<h1>{user.name}</h1>
			<ProfileTimeline posts={posts} />
		</>
	);
}

// The child doesn't trigger fetching anymore
function ProfileTimeline({ posts }) {
	if (posts === null) {
		return <h2>Loading posts...</h2>;
	}

	if (posts && posts.error) {
		return <p>Error posts...</p>;
	}

	return (
		<ul>
			{posts.data.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	);
}

export default ProfilePage

