- gcloud yükle
- gcloud init çalıştır
- gcloud connect kodunu çalıştır

- yeni bir clusters oluştur
- load balance oluştur

# Kaynakça: https://kubernetes.github.io/ingress-nginx/deploy/#quick-start

    * kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml
    * google cloud için ise kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml

- network serviden ip öğren ve hosts dosyasında ilgili değişiklikleri yap
- skaffold ve depl.yaml dosyalarını yapılandır

# Secret değişkenler oluşturduysan çalıştırmayı unutma!

- kubectl create secret generic jwt-secret --from-literal=JWT_KEY=..........
- kubectl get secrets

# Credantial sorunu olursa tekrar giriş yapmayı dene

gcloud auth application-default login

# Tüm podsları siler

# kubectl içeriğini görmek için

- kubectl exec -it auth-depl-5bc56547bc-frr2k sh
