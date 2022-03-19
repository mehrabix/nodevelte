<script>
    import { onMount } from "svelte";
    import './app.css';

    let transactions = [];
    let inputValue = "";
    onMount(() => {
        fetch("/api/transactions")
            .then((res) => res.json())
            .then((data) => {
                transactions = data;
            });
    });
    const addValue = () => {
        let obj = {
            value: inputValue,
        };
        fetch("/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        }).then((res) => {
            console.log(res);
            console.log(res.status);
            fetch("/api/transactions")
                .then((res) => res.json())
                .then((data) => {
                    transactions = data;
                });
        })
    };
    const deleteValue = (id) => {
        fetch("/api/transactions/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            fetch("/api/transactions")
                .then((res) => res.json())
                .then((data) => {
                    transactions = data;
                });
        });
    };
</script>

<div class="flex justify-center flex-col items-center h-screen">
    <input class="input input-bordered w-full max-w-xs" bind:value={inputValue} type="text" placeholder="something..." />
    <button class="btn btn-success mt-5" on:click={addValue}>add</button>
    {#each transactions as t}
    <div class="flex items-center justify-between gap-x-5 mt-6">
        
        <div class="badge badge-primary">
            {t.value}
        </div>
        <button class="btn btn-error" on:click={() => deleteValue(t._id)}>delete</button>
    </div>
    {/each}

    <div  class="alert alert-error shadow-lg mt-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span></span>
        </div>
      </div>
</div>
