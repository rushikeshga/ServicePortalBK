import Swal from 'sweetalert2';

export async function handleResponse(res) {
    try {
        const resp = await res.text();
        console.log(resp);
        if (res.status === 200 && resp !== "DPEXISTS") {
            Swal.fire({
                icon: "success",
                title: "De-activated successfully!"
            });
            return true;
        } else if (res.status === 200 && resp === "DPEXISTS") {
            Swal.fire({
                icon: "warning",
                title: "You are not authorized to de-activate this record, some transaction records still exist"
            });
           return false;
        }
    } catch (error) {
        console.error("Error handling response:", error);
        return false;
    }
}
