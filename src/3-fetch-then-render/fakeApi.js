export function fetchProfileData() {
	return Promise.all([
		fetchUser(),
		fetchPosts()
	]).then(([user, posts]) => {
		return { user, posts };
	});
}

function fetchUser() {
	console.log("fetch user...");
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("fetched user");
			resolve({
				name: "Ringo Starr",
				error: ''
			});
		}, 1000)

		setTimeout(() => {
			console.log("fetched user error");
			resolve({
				name: null,
				error: 'Something went wrong'
			})
		}, Math.random() * 2000)
	});
}

function fetchPosts() {
	console.log("fetch posts...");
	return new Promise(resolve => {
		setTimeout(() => {
			console.log("fetched user error");
			resolve({
				data: null,
				error: 'Something went wrong'
			})
		}, 1500)
		setTimeout(() => {
			console.log("fetched posts");
			resolve({
				data: [
					{
						id: 0,
						text:
							"I get by with a little help from my friends"
					},
					{
						id: 1,
						text:
							"I'd like to be under the sea in an octupus's garden"
					},
					{
						id: 2,
						text:
							"You got that sand all over your feet"
					}
				],
				error: ''
			});
		}, 2000);
	});
}
