.PHONY: configtm,configcom,configtest,server,web,build

HOST:=ru
TESTHOST:=thothbe
APP:=dist

COM_PATH:= /usr/share/nginx/html/shopvill/web
TM_PATH:= /usr/share/nginx/html/shopvill.tm/web
TEST_PATH:= /usr/share/nginx/html/website


configtm:
	cp src/api/config.js.tm src/api/config.js	
configcom:
	cp src/api/config.js.com src/api/config.js	
configtest:
	cp src/api/config.js.test src/api/config.js	

build:
	npm run build
	tar -zcvf $(APP).tar.gz $(APP)

com: 
	npm run build
	tar -zcvf $(APP).tar.gz $(APP)
	scp $(APP).tar.gz  root@$(HOST):$(COM_PATH)/
	-ssh root@$(HOST) "cd  $(COM_PATH) ; rm -rf $(APP); tar -zxvf $(APP).tar.gz ;rm $(APP).tar.gz"
	rm $(APP).tar.gz
	echo "install"

tm: configtm build

	scp $(APP).tar.gz  root@$(HOST):$(TM_PATH)
	-ssh root@$(HOST) "cd  $(TM_PATH) ; rm -rf $(APP); tar -zxvf $(APP).tar.gz ;rm $(APP).tar.gz"
	rm $(APP).tar.gz
	echo "install"

test:configtest build
	scp $(APP).tar.gz  root@$(TESTHOST):$(TEST_PATH)
	-ssh root@$(TESTHOST) "cd  $(TEST_PATH) ; rm -rf $(APP); tar -zxvf $(APP).tar.gz ;rm $(APP).tar.gz"
	rm $(APP).tar.gz
	echo "install"
	
