<script context="module">
	let config;
	export async function load({ page, fetch, session, context }) {
		console.log('SECRET', page, session, context);
		return {
			props: {
				session
			}
		};
	}
</script>

<script>
	export let session;
</script>

I am protected My secret user info
{JSON.stringify(session.user)}
