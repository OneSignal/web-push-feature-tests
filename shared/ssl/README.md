1. Create a `ssl-cert-gen.conf` file with the following contents:

```
[ req ]
default_bits        = 2048
default_keyfile     = dev-ssl.pem
distinguished_name  = subject
req_extensions      = extensions
x509_extensions     = extensions
string_mask         = utf8only

[ subject ]
countryName         = Country Name (2 letter code)
countryName_default     = US

stateOrProvinceName     = State or Province Name (full name)
stateOrProvinceName_default = California

localityName            = Locality Name (eg, city)
localityName_default        = Mountain View

rganizationName         = Organization Name (eg, company)
organizationName_default    = OneSignal

commonName          = Common Name (e.g. server FQDN or YOUR name)
commonName_default      = localhost

emailAddress            = Email Address
emailAddress_default        = support@onesignal.com

[ extensions ]

subjectKeyIdentifier        = hash
authorityKeyIdentifier  = keyid,issuer

basicConstraints        = CA:FALSE
keyUsage            = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage    = serverAuth
subjectAltName          = @alternate_names
nsComment           = "OpenSSL Generated Certificate"

[ alternate_names ]

DNS.1       = localhost
DNS.2       = 127.0.0.1
DNS.3       = test.localhost
```

In the alternate names section, list all the *hostnames* (this does not include the port number or the protocol) you'd like to include with the certificate. *Whatever your Common Name is, it also must be included as an alternate name*. This means that if your Common Name is `localhost`, then `localhost` must also be one of the `alternate_names` DNS entries.

2. Run the following command _from the `.ssl` directory of your OneSignal project root_:

```
openssl req -config ./ssl-cert-gen.conf -new -x509 -newkey rsa:2048 -nodes -keyout dev-ssl.key -days 365 -out dev-ssl.crt
```

3. For our Ruby app using `foreman start`, modify `Procfile` to point to this new certificate:

```
ssl: thin start --ssl --port 3001 --ssl-key-file ./.ssl/dev-ssl.key --ssl-cert-file ./.ssl/dev-ssl.crt
```

You could also start the server using the `thin start --ssl ...` part of the command.

4. Now open the webpage that has this new certificate. Chrome on Mac OS X will tell you the certificate has an invalid authority, because the new certificate hasn't been trusted yet (this happens every time you regenerate the certificate if you change stuff above). Open the Dev Tools Inspector > Security > View Certificate. Drag the *icon* to your desktop. You should see a file like `domain-name.cer` created.

5. Run:

```
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ~/Desktop/domain-name.cer
```

Modify `domain-name`. This adds the certificate to your System keychain, which becomes trusted for all users.

6. Restart Chrome. Should be fully secure and green now.