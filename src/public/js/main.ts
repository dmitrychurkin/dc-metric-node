(function () {
  const metricKey = document.getElementById("metric_key") as HTMLInputElement;
  const metricValue = document.getElementById(
    "metric_value"
  ) as HTMLInputElement;
  const alertWarn = document.querySelector(".alert-warning");
  const sumContainer = document.querySelector(".js-sum");
  const metricForm = document.getElementById("metric");
  const alertSuccess = document.querySelector(".alert-success");

  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("#view_metric") && metricKey.value) {
      fetch(`/api/metric/${metricKey.value}/sum`)
        .then((res) => res.json())
        .then((m) => {
          if (alertWarn && sumContainer) {
            sumContainer.innerHTML = `Current sum metric for key ${metricKey.value} => ${m.value}`;
            alertWarn.classList.add("show");
            dismissAlert(alertWarn);
          }
        });
    }
  });

  if (metricForm) {
    metricForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (metricKey.value && metricValue.value) {
        fetch(`/api/metric/${metricKey.value}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: Number(metricValue.value),
          }),
        }).then(() => {
          if (alertSuccess) {
            alertSuccess.classList.add("show");
            dismissAlert(alertSuccess);
          }
        });
      }
    });
  }

  function dismissAlert(alert: Element, timeout = 5000) {
    setTimeout(() => {
      alert.classList.remove("show");
    }, timeout);
  }
})();
