- gcloud yükle
- gcloud init çalıştır
- gcloud connect kodunu çalıştır

- yeni bir clusters oluştur
- load balance oluştur

# Minikube için

minikube addons enable ingress

# Kaynakça: https://kubernetes.github.io/ingress-nginx/deploy/#quick-start

- minikube addons enable ingress

- kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/cloud/deploy.yaml
- kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml
- google cloud için ise kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml

* network serviden ip öğren ve hosts dosyasında ilgili değişiklikleri yap
* skaffold ve depl.yaml dosyalarını yapılandır

# Secret değişkenler oluşturduysan çalıştırmayı unutma!

- kubectl create secret generic jwt-secret --from-literal=JWT_KEY=AYRSACU......q1
- kubectl get secrets

# Credantial sorunu olursa tekrar giriş yapmayı dene

gcloud auth application-default login

# Tüm podsları siler

# kubectl içeriğini görmek için

- kubectl exec -it auth-depl-5bc56547bc-frr2k sh

# Hata ve Çözümleri

- Error from server (InternalError): error when creating "STDIN": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": failed to call webhook: Post "https://ingress-nginx-controller-admission.ingress-nginx.svc:443/networking/v1/ingresses?timeout=10s": dial tcp 10.106.255.93:443: connect: connection refused
  > kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
  > minikube start --driver=hyperv
  - Eğer hyperv olmadığı için hata alırsa bu sekilde yapabilirsiniz Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-Tools-All -All
# micro-service
