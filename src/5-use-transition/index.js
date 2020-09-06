import React, {
	useState,
	useTransition,
	Suspense
} from "react";

import { fetchProfileData } from "./fakeApi";

function getNextId(id) {
	return id === 3 ? 0 : id + 1;
}

const initialResource = fetchProfileData(0);

function App() {
	const [resource, setResource] = useState(
		initialResource
	);
	// We say that we are ready to wait 3000 ms
	// and after that we can show busy loader
	const [
		startTransition,
		isPending
	] = useTransition({
		timeoutMs: 3000
	});
	return (
		<>
			<button
				disabled={isPending}
				onClick={() => {
					startTransition(() => {
						const nextUserId = getNextId(
							resource.userId
						);
						// it might become a little mindbending. I
						// f we set the state, how come we don’t see
						// the result right away? Where is the next
						// <ProfilePage> rendering?

						// Clearly, both “versions” of <ProfilePage>
						// exist at the same time. We know the old one
						// exists because we see it on the screen
						// and even display a progress indicator on it.
						// And we know the new version also exists somewhere,
						// because it’s the one that we’re waiting for!
						setResource(
							fetchProfileData(nextUserId)
						);
					});
				}}
			>
				Next
			</button>
			{isPending ? " Loading..." : null}
			<ProfilePage resource={resource} />
		</>
	);
}

function ProfilePage({ resource }) {
	return (
		<Suspense
			fallback={<h1>Loading profile...</h1>}
		>
			<ProfileDetails resource={resource} />
			<Suspense
				fallback={<h1>Loading posts...</h1>}
			>
				<ProfileTimeline resource={resource} />
			</Suspense>
		</Suspense>
	);
}

function ProfileDetails({ resource }) {
	const user = resource.user.read();
	return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
	const posts = resource.posts.read();
	return (
		<ul>
			{posts.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	);
}

export default App as UseTransition