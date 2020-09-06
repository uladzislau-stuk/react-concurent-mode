import React, { Suspense } from "react";

import { fetchProfileData } from "./fakeApi";

// What are we going to do if we navigate to another profile’s page?
// We might want to fetch based on props.
// The answer to this is we want to start fetching in the event handlers instead.
const resource = fetchProfileData();

function ProfilePage() {
	return (
		<Suspense
			fallback={<h1>Loading profile...</h1>}
		>
			<ProfileDetails />
			<Suspense
				fallback={<h1>Loading posts...</h1>}
			>
				<ProfileTimeline />
			</Suspense>
		</Suspense>
	);
}

function ProfileDetails() {
	// Try to read user info, although it might not have loaded yet
	const user = resource.user.read();
	return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
	// Try to read data that is already being fetched
	// Try to read posts, although they might not have loaded yet
	const posts = resource.posts.read();
	return (
		<ul>
			{posts.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	);
}

export default ProfilePage