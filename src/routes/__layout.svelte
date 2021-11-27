<script lang="ts" context="module">
	import type { LoadInput } from '@sveltejs/kit/types/page';
	export async function load(load_input: LoadInput) {
		const { session } = load_input;

		return {
			props: {
				session
			}
		};
	}
</script>

<script lang="ts">
	import Header from '$lib/components/organisms/Header.svelte';

	export let session;
	let user = session.user;
</script>

<Header {user} />
<slot />
