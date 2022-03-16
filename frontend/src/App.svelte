<script>
    import { onMount } from "svelte";

    let transactions = [];
    let inputValue = "";
    onMount(() => {
         fetch('/api/transactions').then(res => res.json()).then(data => {
             transactions = data;
         });
    });
    const addValue = () => {
        let obj = {
            value: inputValue,
        };
        fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then((res) =>{
            fetch('/api/transactions').then(res => res.json()).then(data => {
             transactions = data;
         });
        })
    }

</script>

<div>
    {#each transactions as t  }
    <div >
        {t.value}
    </div>
    {/each}


    <input bind:value={inputValue} type="text" placeholder="something..." />
    <button on:click={addValue}>add</button>
</div>

