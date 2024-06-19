
#pragma warning( disable: 4049 )  /* more than 64k source lines */

/* this ALWAYS GENERATED file contains the definitions for the interfaces */


 /* File created by MIDL compiler version 6.00.0347 */
/* Compiler settings for sdoias.idl:
    Oicf, W1, Zp8, env=Win32 (32b run)
    protocol : dce , ms_ext, c_ext, robust
    error checks: allocation ref bounds_check enum stub_data 
    VC __declspec() decoration level: 
         __declspec(uuid()), __declspec(selectany), __declspec(novtable)
         DECLSPEC_UUID(), MIDL_INTERFACE()
*/
//@@MIDL_FILE_HEADING(  )


/* verify that the <rpcndr.h> version is high enough to compile this file*/
#ifndef __REQUIRED_RPCNDR_H_VERSION__
#define __REQUIRED_RPCNDR_H_VERSION__ 475
#endif

#include "rpc.h"
#include "rpcndr.h"

#ifndef __RPCNDR_H_VERSION__
#error this stub requires an updated version of <rpcndr.h>
#endif // __RPCNDR_H_VERSION__


#ifndef __sdoias_h__
#define __sdoias_h__

#if defined(_MSC_VER) && (_MSC_VER >= 1020)
#pragma once
#endif

/* Forward Declarations */ 

#ifndef __ISdoMachine_FWD_DEFINED__
#define __ISdoMachine_FWD_DEFINED__
typedef interface ISdoMachine ISdoMachine;
#endif 	/* __ISdoMachine_FWD_DEFINED__ */


#ifndef __ISdoServiceControl_FWD_DEFINED__
#define __ISdoServiceControl_FWD_DEFINED__
typedef interface ISdoServiceControl ISdoServiceControl;
#endif 	/* __ISdoServiceControl_FWD_DEFINED__ */


#ifndef __ISdo_FWD_DEFINED__
#define __ISdo_FWD_DEFINED__
typedef interface ISdo ISdo;
#endif 	/* __ISdo_FWD_DEFINED__ */


#ifndef __ISdoCollection_FWD_DEFINED__
#define __ISdoCollection_FWD_DEFINED__
typedef interface ISdoCollection ISdoCollection;
#endif 	/* __ISdoCollection_FWD_DEFINED__ */


#ifndef __ISdoDictionaryOld_FWD_DEFINED__
#define __ISdoDictionaryOld_FWD_DEFINED__
typedef interface ISdoDictionaryOld ISdoDictionaryOld;
#endif 	/* __ISdoDictionaryOld_FWD_DEFINED__ */


#ifndef __SdoMachine_FWD_DEFINED__
#define __SdoMachine_FWD_DEFINED__

#ifdef __cplusplus
typedef class SdoMachine SdoMachine;
#else
typedef struct SdoMachine SdoMachine;
#endif /* __cplusplus */

#endif 	/* __SdoMachine_FWD_DEFINED__ */


/* header files for imported files */
#include "oaidl.h"
#include "ocidl.h"

#ifdef __cplusplus
extern "C"{
#endif 

void * __RPC_USER MIDL_user_allocate(size_t);
void __RPC_USER MIDL_user_free( void * ); 


#ifndef __SDOIASLib_LIBRARY_DEFINED__
#define __SDOIASLib_LIBRARY_DEFINED__

/* library SDOIASLib */
/* [helpstring][version][uuid] */ 

typedef /* [public] */ 
enum _ATTRIBUTEID
    {	ATTRIBUTE_UNDEFINED	= 0,
	ATTRIBUTE_MIN_VALUE	= 1,
	RADIUS_ATTRIBUTE_USER_NAME	= ATTRIBUTE_MIN_VALUE,
	RADIUS_ATTRIBUTE_USER_PASSWORD	= RADIUS_ATTRIBUTE_USER_NAME + 1,
	RADIUS_ATTRIBUTE_CHAP_PASSWORD	= RADIUS_ATTRIBUTE_USER_PASSWORD + 1,
	RADIUS_ATTRIBUTE_NAS_IP_ADDRESS	= RADIUS_ATTRIBUTE_CHAP_PASSWORD + 1,
	RADIUS_ATTRIBUTE_NAS_PORT	= RADIUS_ATTRIBUTE_NAS_IP_ADDRESS + 1,
	RADIUS_ATTRIBUTE_SERVICE_TYPE	= RADIUS_ATTRIBUTE_NAS_PORT + 1,
	RADIUS_ATTRIBUTE_FRAMED_PROTOCOL	= RADIUS_ATTRIBUTE_SERVICE_TYPE + 1,
	RADIUS_ATTRIBUTE_FRAMED_IP_ADDRESS	= RADIUS_ATTRIBUTE_FRAMED_PROTOCOL + 1,
	RADIUS_ATTRIBUTE_FRAMED_IP_NETMASK	= RADIUS_ATTRIBUTE_FRAMED_IP_ADDRESS + 1,
	RADIUS_ATTRIBUTE_FRAMED_ROUTING	= RADIUS_ATTRIBUTE_FRAMED_IP_NETMASK + 1,
	RADIUS_ATTRIBUTE_FILTER_ID	= RADIUS_ATTRIBUTE_FRAMED_ROUTING + 1,
	RADIUS_ATTRIBUTE_FRAMED_MTU	= RADIUS_ATTRIBUTE_FILTER_ID + 1,
	RADIUS_ATTRIBUTE_FRAMED_COMPRESSION	= RADIUS_ATTRIBUTE_FRAMED_MTU + 1,
	RADIUS_ATTRIBUTE_LOGIN_IP_HOST	= RADIUS_ATTRIBUTE_FRAMED_COMPRESSION + 1,
	RADIUS_ATTRIBUTE_LOGIN_SERVICE	= RADIUS_ATTRIBUTE_LOGIN_IP_HOST + 1,
	RADIUS_ATTRIBUTE_LOGIN_TCP_PORT	= RADIUS_ATTRIBUTE_LOGIN_SERVICE + 1,
	RADIUS_ATTRIBUTE_UNASSIGNED1	= RADIUS_ATTRIBUTE_LOGIN_TCP_PORT + 1,
	RADIUS_ATTRIBUTE_REPLY_MESSAGE	= RADIUS_ATTRIBUTE_UNASSIGNED1 + 1,
	RADIUS_ATTRIBUTE_CALLBACK_NUMBER	= RADIUS_ATTRIBUTE_REPLY_MESSAGE + 1,
	RADIUS_ATTRIBUTE_CALLBACK_ID	= RADIUS_ATTRIBUTE_CALLBACK_NUMBER + 1,
	RADIUS_ATTRIBUTE_UNASSIGNED2	= RADIUS_ATTRIBUTE_CALLBACK_ID + 1,
	RADIUS_ATTRIBUTE_FRAMED_ROUTE	= RADIUS_ATTRIBUTE_UNASSIGNED2 + 1,
	RADIUS_ATTRIBUTE_FRAMED_IPX_NETWORK	= RADIUS_ATTRIBUTE_FRAMED_ROUTE + 1,
	RADIUS_ATTRIBUTE_STATE	= RADIUS_ATTRIBUTE_FRAMED_IPX_NETWORK + 1,
	RADIUS_ATTRIBUTE_CLASS	= RADIUS_ATTRIBUTE_STATE + 1,
	RADIUS_ATTRIBUTE_VENDOR_SPECIFIC	= RADIUS_ATTRIBUTE_CLASS + 1,
	RADIUS_ATTRIBUTE_SESSION_TIMEOUT	= RADIUS_ATTRIBUTE_VENDOR_SPECIFIC + 1,
	RADIUS_ATTRIBUTE_IDLE_TIMEOUT	= RADIUS_ATTRIBUTE_SESSION_TIMEOUT + 1,
	RADIUS_ATTRIBUTE_TERMINATION_ACTION	= RADIUS_ATTRIBUTE_IDLE_TIMEOUT + 1,
	RADIUS_ATTRIBUTE_CALLED_STATION_ID	= RADIUS_ATTRIBUTE_TERMINATION_ACTION + 1,
	RADIUS_ATTRIBUTE_CALLING_STATION_ID	= RADIUS_ATTRIBUTE_CALLED_STATION_ID + 1,
	RADIUS_ATTRIBUTE_NAS_IDENTIFIER	= RADIUS_ATTRIBUTE_CALLING_STATION_ID + 1,
	RADIUS_ATTRIBUTE_PROXY_STATE	= RADIUS_ATTRIBUTE_NAS_IDENTIFIER + 1,
	RADIUS_ATTRIBUTE_LOGIN_LAT_SERVICE	= RADIUS_ATTRIBUTE_PROXY_STATE + 1,
	RADIUS_ATTRIBUTE_LOGIN_LAT_NODE	= RADIUS_ATTRIBUTE_LOGIN_LAT_SERVICE + 1,
	RADIUS_ATTRIBUTE_LOGIN_LAT_GROUP	= RADIUS_ATTRIBUTE_LOGIN_LAT_NODE + 1,
	RADIUS_ATTRIBUTE_FRAMED_APPLETALK_LINK	= RADIUS_ATTRIBUTE_LOGIN_LAT_GROUP + 1,
	RADIUS_ATTRIBUTE_FRAMED_APPLETALK_NET	= RADIUS_ATTRIBUTE_FRAMED_APPLETALK_LINK + 1,
	RADIUS_ATTRIBUTE_FRAMED_APPLETALK_ZONE	= RADIUS_ATTRIBUTE_FRAMED_APPLETALK_NET + 1,
	RADIUS_ATTRIBUTE_ACCT_STATUS_TYPE	= RADIUS_ATTRIBUTE_FRAMED_APPLETALK_ZONE + 1,
	RADIUS_ATTRIBUTE_ACCT_DELAY_TIME	= RADIUS_ATTRIBUTE_ACCT_STATUS_TYPE + 1,
	RADIUS_ATTRIBUTE_ACCT_INPUT_OCTETS	= RADIUS_ATTRIBUTE_ACCT_DELAY_TIME + 1,
	RADIUS_ATTRIBUTE_ACCT_OUTPUT_OCTETS	= RADIUS_ATTRIBUTE_ACCT_INPUT_OCTETS + 1,
	RADIUS_ATTRIBUTE_ACCT_SESSION_ID	= RADIUS_ATTRIBUTE_ACCT_OUTPUT_OCTETS + 1,
	RADIUS_ATTRIBUTE_ACCT_AUTHENTIC	= RADIUS_ATTRIBUTE_ACCT_SESSION_ID + 1,
	RADIUS_ATTRIBUTE_ACCT_SESSION_TIME	= RADIUS_ATTRIBUTE_ACCT_AUTHENTIC + 1,
	RADIUS_ATTRIBUTE_ACCT_INPUT_PACKETS	= RADIUS_ATTRIBUTE_ACCT_SESSION_TIME + 1,
	RADIUS_ATTRIBUTE_ACCT_OUTPUT_PACKETS	= RADIUS_ATTRIBUTE_ACCT_INPUT_PACKETS + 1,
	RADIUS_ATTRIBUTE_ACCT_TERMINATE_CAUSE	= RADIUS_ATTRIBUTE_ACCT_OUTPUT_PACKETS + 1,
	RADIUS_ATTRIBUTE_ACCT_MULTI_SSN_ID	= RADIUS_ATTRIBUTE_ACCT_TERMINATE_CAUSE + 1,
	RADIUS_ATTRIBUTE_ACCT_LINK_COUNT	= RADIUS_ATTRIBUTE_ACCT_MULTI_SSN_ID + 1,
	RADIUS_ATTRIBUTE_CHAP_CHALLENGE	= 60,
	RADIUS_ATTRIBUTE_NAS_PORT_TYPE	= RADIUS_ATTRIBUTE_CHAP_CHALLENGE + 1,
	RADIUS_ATTRIBUTE_PORT_LIMIT	= RADIUS_ATTRIBUTE_NAS_PORT_TYPE + 1,
	RADIUS_ATTRIBUTE_LOGIN_LAT_PORT	= RADIUS_ATTRIBUTE_PORT_LIMIT + 1,
	RADIUS_ATTRIBUTE_TUNNEL_TYPE	= RADIUS_ATTRIBUTE_LOGIN_LAT_PORT + 1,
	RADIUS_ATTRIBUTE_TUNNEL_MEDIUM_TYPE	= RADIUS_ATTRIBUTE_TUNNEL_TYPE + 1,
	RADIUS_ATTRIBUTE_TUNNEL_CLIENT_ENDPT	= RADIUS_ATTRIBUTE_TUNNEL_MEDIUM_TYPE + 1,
	RADIUS_ATTRIBUTE_TUNNEL_SERVER_ENDPT	= RADIUS_ATTRIBUTE_TUNNEL_CLIENT_ENDPT + 1,
	RADIUS_ATTRIBUTE_ACCT_TUNNEL_CONN	= RADIUS_ATTRIBUTE_TUNNEL_SERVER_ENDPT + 1,
	RADIUS_ATTRIBUTE_TUNNEL_PASSWORD	= RADIUS_ATTRIBUTE_ACCT_TUNNEL_CONN + 1,
	RADIUS_ATTRIBUTE_ARAP_PASSWORD	= RADIUS_ATTRIBUTE_TUNNEL_PASSWORD + 1,
	RADIUS_ATTRIBUTE_ARAP_FEATURES	= RADIUS_ATTRIBUTE_ARAP_PASSWORD + 1,
	RADIUS_ATTRIBUTE_ARAP_ZONE_ACCESS	= RADIUS_ATTRIBUTE_ARAP_FEATURES + 1,
	RADIUS_ATTRIBUTE_ARAP_SECURITY	= RADIUS_ATTRIBUTE_ARAP_ZONE_ACCESS + 1,
	RADIUS_ATTRIBUTE_ARAP_SECURITY_DATA	= RADIUS_ATTRIBUTE_ARAP_SECURITY + 1,
	RADIUS_ATTRIBUTE_PASSWORD_RETRY	= RADIUS_ATTRIBUTE_ARAP_SECURITY_DATA + 1,
	RADIUS_ATTRIBUTE_PROMPT	= 76,
	RADIUS_ATTRIBUTE_CONNECT_INFO	= RADIUS_ATTRIBUTE_PROMPT + 1,
	RADIUS_ATTRIBUTE_CONFIGURATION_TOKEN	= RADIUS_ATTRIBUTE_CONNECT_INFO + 1,
	RADIUS_ATTRIBUTE_EAP_MESSAGE	= RADIUS_ATTRIBUTE_CONFIGURATION_TOKEN + 1,
	RADIUS_ATTRIBUTE_SIGNATURE	= RADIUS_ATTRIBUTE_EAP_MESSAGE + 1,
	RADIUS_ATTRIBUTE_TUNNEL_PVT_GROUP_ID	= RADIUS_ATTRIBUTE_SIGNATURE + 1,
	RADIUS_ATTRIBUTE_TUNNEL_ASSIGNMENT_ID	= RADIUS_ATTRIBUTE_TUNNEL_PVT_GROUP_ID + 1,
	RADIUS_ATTRIBUTE_TUNNEL_PREFERENCE	= RADIUS_ATTRIBUTE_TUNNEL_ASSIGNMENT_ID + 1,
	RADIUS_ATTRIBUTE_ARAP_CHALLENGE_RESPONSE	= RADIUS_ATTRIBUTE_TUNNEL_PREFERENCE + 1,
	IAS_ATTRIBUTE_SAVED_RADIUS_FRAMED_IP_ADDRESS	= 0x1000,
	IAS_ATTRIBUTE_SAVED_RADIUS_CALLBACK_NUMBER	= IAS_ATTRIBUTE_SAVED_RADIUS_FRAMED_IP_ADDRESS + 1,
	IAS_ATTRIBUTE_NP_CALLING_STATION_ID	= IAS_ATTRIBUTE_SAVED_RADIUS_CALLBACK_NUMBER + 1,
	IAS_ATTRIBUTE_SAVED_NP_CALLING_STATION_ID	= IAS_ATTRIBUTE_NP_CALLING_STATION_ID + 1,
	IAS_ATTRIBUTE_SAVED_RADIUS_FRAMED_ROUTE	= IAS_ATTRIBUTE_SAVED_NP_CALLING_STATION_ID + 1,
	IAS_ATTRIBUTE_IGNORE_USER_DIALIN_PROPERTIES	= IAS_ATTRIBUTE_SAVED_RADIUS_FRAMED_ROUTE + 1,
	IAS_ATTRIBUTE_NP_TIME_OF_DAY	= IAS_ATTRIBUTE_IGNORE_USER_DIALIN_PROPERTIES + 1,
	IAS_ATTRIBUTE_NP_CALLED_STATION_ID	= IAS_ATTRIBUTE_NP_TIME_OF_DAY + 1,
	IAS_ATTRIBUTE_NP_ALLOWED_PORT_TYPES	= IAS_ATTRIBUTE_NP_CALLED_STATION_ID + 1,
	IAS_ATTRIBUTE_NP_AUTHENTICATION_TYPE	= IAS_ATTRIBUTE_NP_ALLOWED_PORT_TYPES + 1,
	IAS_ATTRIBUTE_NP_ALLOWED_EAP_TYPE	= IAS_ATTRIBUTE_NP_AUTHENTICATION_TYPE + 1,
	IAS_ATTRIBUTE_SHARED_SECRET	= IAS_ATTRIBUTE_NP_ALLOWED_EAP_TYPE + 1,
	IAS_ATTRIBUTE_CLIENT_IP_ADDRESS	= IAS_ATTRIBUTE_SHARED_SECRET + 1,
	IAS_ATTRIBUTE_CLIENT_PACKET_HEADER	= IAS_ATTRIBUTE_CLIENT_IP_ADDRESS + 1,
	IAS_ATTRIBUTE_TOKEN_GROUPS	= IAS_ATTRIBUTE_CLIENT_PACKET_HEADER + 1,
	IAS_ATTRIBUTE_ALLOW_DIALIN	= IAS_ATTRIBUTE_TOKEN_GROUPS + 1,
	IAS_ATTRIBUTE_NP_CONSTRAINT	= IAS_ATTRIBUTE_ALLOW_DIALIN + 1,
	IAS_ATTRIBUTE_MANIPULATION_TARGET	= IAS_ATTRIBUTE_NP_CONSTRAINT + 1,
	IAS_ATTRIBUTE_MANIPULATION_RULE	= IAS_ATTRIBUTE_MANIPULATION_TARGET + 1,
	IAS_ATTRIBUTE_ORIGINAL_USER_NAME	= IAS_ATTRIBUTE_MANIPULATION_RULE + 1,
	IAS_ATTRIBUTE_CLIENT_VENDOR_TYPE	= IAS_ATTRIBUTE_ORIGINAL_USER_NAME + 1,
	IAS_ATTRIBUTE_CLIENT_UDP_PORT	= IAS_ATTRIBUTE_CLIENT_VENDOR_TYPE + 1,
	MS_ATTRIBUTE_CHAP_CHALLENGE	= IAS_ATTRIBUTE_CLIENT_UDP_PORT + 1,
	MS_ATTRIBUTE_CHAP_RESPONSE	= MS_ATTRIBUTE_CHAP_CHALLENGE + 1,
	MS_ATTRIBUTE_CHAP_DOMAIN	= MS_ATTRIBUTE_CHAP_RESPONSE + 1,
	MS_ATTRIBUTE_CHAP_ERROR	= MS_ATTRIBUTE_CHAP_DOMAIN + 1,
	MS_ATTRIBUTE_CHAP_CPW1	= MS_ATTRIBUTE_CHAP_ERROR + 1,
	MS_ATTRIBUTE_CHAP_CPW2	= MS_ATTRIBUTE_CHAP_CPW1 + 1,
	MS_ATTRIBUTE_CHAP_LM_ENC_PW	= MS_ATTRIBUTE_CHAP_CPW2 + 1,
	MS_ATTRIBUTE_CHAP_NT_ENC_PW	= MS_ATTRIBUTE_CHAP_LM_ENC_PW + 1,
	MS_ATTRIBUTE_CHAP_MPPE_KEYS	= MS_ATTRIBUTE_CHAP_NT_ENC_PW + 1,
	IAS_ATTRIBUTE_AUTHENTICATION_TYPE	= MS_ATTRIBUTE_CHAP_MPPE_KEYS + 1,
	IAS_ATTRIBUTE_CLIENT_NAME	= IAS_ATTRIBUTE_AUTHENTICATION_TYPE + 1,
	IAS_ATTRIBUTE_NT4_ACCOUNT_NAME	= IAS_ATTRIBUTE_CLIENT_NAME + 1,
	IAS_ATTRIBUTE_FULLY_QUALIFIED_USER_NAME	= IAS_ATTRIBUTE_NT4_ACCOUNT_NAME + 1,
	IAS_ATTRIBUTE_NTGROUPS	= IAS_ATTRIBUTE_FULLY_QUALIFIED_USER_NAME + 1,
	IAS_ATTRIBUTE_EAP_FRIENDLY_NAME	= IAS_ATTRIBUTE_NTGROUPS + 1,
	IAS_ATTRIBUTE_AUTH_PROVIDER_TYPE	= IAS_ATTRIBUTE_EAP_FRIENDLY_NAME + 1,
	MS_ATTRIBUTE_ACCT_AUTH_TYPE	= IAS_ATTRIBUTE_AUTH_PROVIDER_TYPE + 1,
	MS_ATTRIBUTE_ACCT_EAP_TYPE	= MS_ATTRIBUTE_ACCT_AUTH_TYPE + 1,
	IAS_ATTRIBUTE_PACKET_TYPE	= MS_ATTRIBUTE_ACCT_EAP_TYPE + 1,
	IAS_ATTRIBUTE_AUTH_PROVIDER_NAME	= IAS_ATTRIBUTE_PACKET_TYPE + 1,
	IAS_ATTRIBUTE_ACCT_PROVIDER_TYPE	= IAS_ATTRIBUTE_AUTH_PROVIDER_NAME + 1,
	IAS_ATTRIBUTE_ACCT_PROVIDER_NAME	= IAS_ATTRIBUTE_ACCT_PROVIDER_TYPE + 1,
	MS_ATTRIBUTE_MPPE_SEND_KEY	= IAS_ATTRIBUTE_ACCT_PROVIDER_NAME + 1,
	MS_ATTRIBUTE_MPPE_RECV_KEY	= MS_ATTRIBUTE_MPPE_SEND_KEY + 1,
	IAS_ATTRIBUTE_REASON_CODE	= MS_ATTRIBUTE_MPPE_RECV_KEY + 1,
	MS_ATTRIBUTE_FILTER	= IAS_ATTRIBUTE_REASON_CODE + 1,
	MS_ATTRIBUTE_CHAP2_RESPONSE	= MS_ATTRIBUTE_FILTER + 1,
	MS_ATTRIBUTE_CHAP2_SUCCESS	= MS_ATTRIBUTE_CHAP2_RESPONSE + 1,
	MS_ATTRIBUTE_CHAP2_CPW	= MS_ATTRIBUTE_CHAP2_SUCCESS + 1,
	MS_ATTRIBUTE_RAS_VENDOR	= MS_ATTRIBUTE_CHAP2_CPW + 1,
	MS_ATTRIBUTE_RAS_VERSION	= MS_ATTRIBUTE_RAS_VENDOR + 1,
	IAS_ATTRIBUTE_NP_NAME	= MS_ATTRIBUTE_RAS_VERSION + 1,
	MS_ATTRIBUTE_PRIMARY_DNS_SERVER	= IAS_ATTRIBUTE_NP_NAME + 1,
	MS_ATTRIBUTE_SECONDARY_DNS_SERVER	= MS_ATTRIBUTE_PRIMARY_DNS_SERVER + 1,
	MS_ATTRIBUTE_PRIMARY_NBNS_SERVER	= MS_ATTRIBUTE_SECONDARY_DNS_SERVER + 1,
	MS_ATTRIBUTE_SECONDARY_NBNS_SERVER	= MS_ATTRIBUTE_PRIMARY_NBNS_SERVER + 1,
	IAS_ATTRIBUTE_PROXY_POLICY_NAME	= MS_ATTRIBUTE_SECONDARY_NBNS_SERVER + 1,
	IAS_ATTRIBUTE_PROVIDER_TYPE	= IAS_ATTRIBUTE_PROXY_POLICY_NAME + 1,
	IAS_ATTRIBUTE_PROVIDER_NAME	= IAS_ATTRIBUTE_PROVIDER_TYPE + 1,
	IAS_ATTRIBUTE_REMOTE_SERVER_ADDRESS	= IAS_ATTRIBUTE_PROVIDER_NAME + 1,
	IAS_ATTRIBUTE_GENERATE_CLASS_ATTRIBUTE	= IAS_ATTRIBUTE_REMOTE_SERVER_ADDRESS + 1,
	MS_ATTRIBUTE_RAS_CLIENT_NAME	= IAS_ATTRIBUTE_GENERATE_CLASS_ATTRIBUTE + 1,
	MS_ATTRIBUTE_RAS_CLIENT_VERSION	= MS_ATTRIBUTE_RAS_CLIENT_NAME + 1,
	IAS_ATTRIBUTE_ALLOWED_CERTIFICATE_EKU	= MS_ATTRIBUTE_RAS_CLIENT_VERSION + 1,
	IAS_ATTRIBUTE_CERTIFICATE_EKU	= 8097,
	RAS_ATTRIBUTE_ENCRYPTION_TYPE	= 0xffffffff - 89,
	RAS_ATTRIBUTE_ENCRYPTION_POLICY	= RAS_ATTRIBUTE_ENCRYPTION_TYPE + 1,
	RAS_ATTRIBUTE_BAP_REQUIRED	= RAS_ATTRIBUTE_ENCRYPTION_POLICY + 1,
	RAS_ATTRIBUTE_BAP_LINE_DOWN_TIME	= RAS_ATTRIBUTE_BAP_REQUIRED + 1,
	RAS_ATTRIBUTE_BAP_LINE_DOWN_LIMIT	= RAS_ATTRIBUTE_BAP_LINE_DOWN_TIME + 1
    } 	ATTRIBUTEID;

typedef /* [public] */ 
enum _NEW_LOG_FILE_FREQUENCY
    {	IAS_LOGGING_UNLIMITED_SIZE	= 0,
	IAS_LOGGING_DAILY	= IAS_LOGGING_UNLIMITED_SIZE + 1,
	IAS_LOGGING_WEEKLY	= IAS_LOGGING_DAILY + 1,
	IAS_LOGGING_MONTHLY	= IAS_LOGGING_WEEKLY + 1,
	IAS_LOGGING_WHEN_FILE_SIZE_REACHES	= IAS_LOGGING_MONTHLY + 1
    } 	NEW_LOG_FILE_FREQUENCY;

typedef /* [public] */ 
enum _AUTHENTICATION_TYPE
    {	IAS_AUTH_INVALID	= 0,
	IAS_AUTH_PAP	= IAS_AUTH_INVALID + 1,
	IAS_AUTH_MD5CHAP	= IAS_AUTH_PAP + 1,
	IAS_AUTH_MSCHAP	= IAS_AUTH_MD5CHAP + 1,
	IAS_AUTH_MSCHAP2	= IAS_AUTH_MSCHAP + 1,
	IAS_AUTH_EAP	= IAS_AUTH_MSCHAP2 + 1,
	IAS_AUTH_ARAP	= IAS_AUTH_EAP + 1,
	IAS_AUTH_NONE	= IAS_AUTH_ARAP + 1,
	IAS_AUTH_CUSTOM	= IAS_AUTH_NONE + 1,
	IAS_AUTH_MSCHAP_CPW	= IAS_AUTH_CUSTOM + 1,
	IAS_AUTH_MSCHAP2_CPW	= IAS_AUTH_MSCHAP_CPW + 1
    } 	AUTHENTICATION_TYPE;

typedef /* [public] */ 
enum _ATTRIBUTESYNTAX
    {	IAS_SYNTAX_BOOLEAN	= 1,
	IAS_SYNTAX_INTEGER	= IAS_SYNTAX_BOOLEAN + 1,
	IAS_SYNTAX_ENUMERATOR	= IAS_SYNTAX_INTEGER + 1,
	IAS_SYNTAX_INETADDR	= IAS_SYNTAX_ENUMERATOR + 1,
	IAS_SYNTAX_STRING	= IAS_SYNTAX_INETADDR + 1,
	IAS_SYNTAX_OCTETSTRING	= IAS_SYNTAX_STRING + 1,
	IAS_SYNTAX_UTCTIME	= IAS_SYNTAX_OCTETSTRING + 1,
	IAS_SYNTAX_PROVIDERSPECIFIC	= IAS_SYNTAX_UTCTIME + 1,
	IAS_SYNTAX_UNSIGNEDINTEGER	= IAS_SYNTAX_PROVIDERSPECIFIC + 1
    } 	ATTRIBUTESYNTAX;

typedef /* [public] */ 
enum _ATTRIBUTERESTRICTIONS
    {	MULTIVALUED	= 0x1,
	ALLOWEDINPROFILE	= 0x2,
	ALLOWEDINCONDITION	= 0x4,
	ALLOWEDINPROXYPROFILE	= 0x8,
	ALLOWEDINPROXYCONDITION	= 0x10
    } 	ATTRIBUTERESTRICTIONS;

typedef /* [public] */ 
enum _ATTRIBUTEINFO
    {	NAME	= 1,
	SYNTAX	= NAME + 1,
	RESTRICTIONS	= SYNTAX + 1,
	DESCRIPTION	= RESTRICTIONS + 1,
	VENDORID	= DESCRIPTION + 1,
	LDAPNAME	= VENDORID + 1,
	VENDORTYPE	= LDAPNAME + 1
    } 	ATTRIBUTEINFO;

typedef /* [public] */ 
enum _IASCOMMONPROPERTIES
    {	PROPERTY_SDO_RESERVED	= 0,
	PROPERTY_SDO_CLASS	= PROPERTY_SDO_RESERVED + 1,
	PROPERTY_SDO_NAME	= PROPERTY_SDO_CLASS + 1,
	PROPERTY_SDO_DESCRIPTION	= PROPERTY_SDO_NAME + 1,
	PROPERTY_SDO_ID	= PROPERTY_SDO_DESCRIPTION + 1,
	PROPERTY_SDO_DATASTORE_NAME	= PROPERTY_SDO_ID + 1,
	PROPERTY_SDO_START	= 0x400
    } 	IASCOMMONPROPERTIES;

typedef /* [public] */ 
enum _USERPROPERTIES
    {	PROPERTY_USER_CALLING_STATION_ID	= PROPERTY_SDO_START,
	PROPERTY_USER_SAVED_CALLING_STATION_ID	= PROPERTY_USER_CALLING_STATION_ID + 1,
	PROPERTY_USER_RADIUS_CALLBACK_NUMBER	= PROPERTY_USER_SAVED_CALLING_STATION_ID + 1,
	PROPERTY_USER_RADIUS_FRAMED_ROUTE	= PROPERTY_USER_RADIUS_CALLBACK_NUMBER + 1,
	PROPERTY_USER_RADIUS_FRAMED_IP_ADDRESS	= PROPERTY_USER_RADIUS_FRAMED_ROUTE + 1,
	PROPERTY_USER_SAVED_RADIUS_CALLBACK_NUMBER	= PROPERTY_USER_RADIUS_FRAMED_IP_ADDRESS + 1,
	PROPERTY_USER_SAVED_RADIUS_FRAMED_ROUTE	= PROPERTY_USER_SAVED_RADIUS_CALLBACK_NUMBER + 1,
	PROPERTY_USER_SAVED_RADIUS_FRAMED_IP_ADDRESS	= PROPERTY_USER_SAVED_RADIUS_FRAMED_ROUTE + 1,
	PROPERTY_USER_ALLOW_DIALIN	= PROPERTY_USER_SAVED_RADIUS_FRAMED_IP_ADDRESS + 1,
	PROPERTY_USER_SERVICE_TYPE	= PROPERTY_USER_ALLOW_DIALIN + 1
    } 	USERPROPERTIES;

typedef /* [public] */ 
enum _DICTIONARYPROPERTIES
    {	PROPERTY_DICTIONARY_ATTRIBUTES_COLLECTION	= PROPERTY_SDO_START,
	PROPERTY_DICTIONARY_LOCATION	= PROPERTY_DICTIONARY_ATTRIBUTES_COLLECTION + 1
    } 	DICTIONARYPROPERTIES;

typedef /* [public] */ 
enum _ATTRIBUTEPROPERTIES
    {	PROPERTY_ATTRIBUTE_ID	= PROPERTY_SDO_START,
	PROPERTY_ATTRIBUTE_VENDOR_ID	= PROPERTY_ATTRIBUTE_ID + 1,
	PROPERTY_ATTRIBUTE_VENDOR_TYPE_ID	= PROPERTY_ATTRIBUTE_VENDOR_ID + 1,
	PROPERTY_ATTRIBUTE_IS_ENUMERABLE	= PROPERTY_ATTRIBUTE_VENDOR_TYPE_ID + 1,
	PROPERTY_ATTRIBUTE_ENUM_NAMES	= PROPERTY_ATTRIBUTE_IS_ENUMERABLE + 1,
	PROPERTY_ATTRIBUTE_ENUM_VALUES	= PROPERTY_ATTRIBUTE_ENUM_NAMES + 1,
	PROPERTY_ATTRIBUTE_SYNTAX	= PROPERTY_ATTRIBUTE_ENUM_VALUES + 1,
	PROPERTY_ATTRIBUTE_ALLOW_MULTIPLE	= PROPERTY_ATTRIBUTE_SYNTAX + 1,
	PROPERTY_ATTRIBUTE_ALLOW_LOG_ORDINAL	= PROPERTY_ATTRIBUTE_ALLOW_MULTIPLE + 1,
	PROPERTY_ATTRIBUTE_ALLOW_IN_PROFILE	= PROPERTY_ATTRIBUTE_ALLOW_LOG_ORDINAL + 1,
	PROPERTY_ATTRIBUTE_ALLOW_IN_CONDITION	= PROPERTY_ATTRIBUTE_ALLOW_IN_PROFILE + 1,
	PROPERTY_ATTRIBUTE_DISPLAY_NAME	= PROPERTY_ATTRIBUTE_ALLOW_IN_CONDITION + 1,
	PROPERTY_ATTRIBUTE_VALUE	= PROPERTY_ATTRIBUTE_DISPLAY_NAME + 1,
	PROPERTY_ATTRIBUTE_ALLOW_IN_PROXY_PROFILE	= PROPERTY_ATTRIBUTE_VALUE + 1,
	PROPERTY_ATTRIBUTE_ALLOW_IN_PROXY_CONDITION	= PROPERTY_ATTRIBUTE_ALLOW_IN_PROXY_PROFILE + 1
    } 	ATTRIBUTEPROPERTIES;

typedef /* [public] */ 
enum _IASPROPERTIES
    {	PROPERTY_IAS_RADIUSSERVERGROUPS_COLLECTION	= PROPERTY_SDO_START,
	PROPERTY_IAS_POLICIES_COLLECTION	= PROPERTY_IAS_RADIUSSERVERGROUPS_COLLECTION + 1,
	PROPERTY_IAS_PROFILES_COLLECTION	= PROPERTY_IAS_POLICIES_COLLECTION + 1,
	PROPERTY_IAS_PROTOCOLS_COLLECTION	= PROPERTY_IAS_PROFILES_COLLECTION + 1,
	PROPERTY_IAS_AUDITORS_COLLECTION	= PROPERTY_IAS_PROTOCOLS_COLLECTION + 1,
	PROPERTY_IAS_REQUESTHANDLERS_COLLECTION	= PROPERTY_IAS_AUDITORS_COLLECTION + 1,
	PROPERTY_IAS_PROXYPOLICIES_COLLECTION	= PROPERTY_IAS_REQUESTHANDLERS_COLLECTION + 1,
	PROPERTY_IAS_PROXYPROFILES_COLLECTION	= PROPERTY_IAS_PROXYPOLICIES_COLLECTION + 1
    } 	IASPROPERTIES;

typedef /* [public] */ 
enum _CLIENTPROPERTIES
    {	PROPERTY_CLIENT_REQUIRE_SIGNATURE	= PROPERTY_SDO_START,
	PROPERTY_CLIENT_UNUSED	= PROPERTY_CLIENT_REQUIRE_SIGNATURE + 1,
	PROPERTY_CLIENT_SHARED_SECRET	= PROPERTY_CLIENT_UNUSED + 1,
	PROPERTY_CLIENT_NAS_MANUFACTURER	= PROPERTY_CLIENT_SHARED_SECRET + 1,
	PROPERTY_CLIENT_ADDRESS	= PROPERTY_CLIENT_NAS_MANUFACTURER + 1
    } 	CLIENTPROPERTIES;

typedef /* [public] */ 
enum _VENDORPROPERTIES
    {	PROPERTY_NAS_VENDOR_ID	= PROPERTY_SDO_START
    } 	VENDORPROPERTIES;

typedef /* [public] */ 
enum _PROFILEPROPERTIES
    {	PROPERTY_PROFILE_ATTRIBUTES_COLLECTION	= PROPERTY_SDO_START
    } 	PROFILEPROPERTIES;

typedef /* [public] */ 
enum _POLICYPROPERTIES
    {	PROPERTY_POLICY_CONSTRAINT	= PROPERTY_SDO_START,
	PROPERTY_POLICY_MERIT	= PROPERTY_POLICY_CONSTRAINT + 1,
	PROPERTY_POLICY_UNUSED0	= PROPERTY_POLICY_MERIT + 1,
	PROPERTY_POLICY_UNUSED1	= PROPERTY_POLICY_UNUSED0 + 1,
	PROPERTY_POLICY_PROFILE_NAME	= PROPERTY_POLICY_UNUSED1 + 1,
	PROPERTY_POLICY_ACTION	= PROPERTY_POLICY_PROFILE_NAME + 1,
	PROPERTY_POLICY_CONDITIONS_COLLECTION	= PROPERTY_POLICY_ACTION + 1
    } 	POLICYPROPERTIES;

typedef /* [public] */ 
enum _CONDITIONPROPERTIES
    {	PROPERTY_CONDITION_TEXT	= PROPERTY_SDO_START
    } 	CONDITIONPROPERTIES;

typedef /* [public] */ 
enum _RADIUSSERVERGROUPPROPERTIES
    {	PROPERTY_RADIUSSERVERGROUP_SERVERS_COLLECTION	= PROPERTY_SDO_START
    } 	RADIUSSERVERGROUPPROPERTIES;

typedef /* [public] */ 
enum _RADIUSSERVERPROPERTIES
    {	PROPERTY_RADIUSSERVER_AUTH_PORT	= PROPERTY_SDO_START,
	PROPERTY_RADIUSSERVER_AUTH_SECRET	= PROPERTY_RADIUSSERVER_AUTH_PORT + 1,
	PROPERTY_RADIUSSERVER_ACCT_PORT	= PROPERTY_RADIUSSERVER_AUTH_SECRET + 1,
	PROPERTY_RADIUSSERVER_ACCT_SECRET	= PROPERTY_RADIUSSERVER_ACCT_PORT + 1,
	PROPERTY_RADIUSSERVER_ADDRESS	= PROPERTY_RADIUSSERVER_ACCT_SECRET + 1,
	PROPERTY_RADIUSSERVER_FORWARD_ACCT_ONOFF	= PROPERTY_RADIUSSERVER_ADDRESS + 1,
	PROPERTY_RADIUSSERVER_PRIORITY	= PROPERTY_RADIUSSERVER_FORWARD_ACCT_ONOFF + 1,
	PROPERTY_RADIUSSERVER_WEIGHT	= PROPERTY_RADIUSSERVER_PRIORITY + 1,
	PROPERTY_RADIUSSERVER_TIMEOUT	= PROPERTY_RADIUSSERVER_WEIGHT + 1,
	PROPERTY_RADIUSSERVER_MAX_LOST	= PROPERTY_RADIUSSERVER_TIMEOUT + 1,
	PROPERTY_RADIUSSERVER_BLACKOUT	= PROPERTY_RADIUSSERVER_MAX_LOST + 1
    } 	RADIUSSERVERPROPERTIES;

typedef /* [public] */ 
enum _IASCOMPONENTPROPERTIES
    {	PROPERTY_COMPONENT_ID	= PROPERTY_SDO_START,
	PROPERTY_COMPONENT_PROG_ID	= PROPERTY_COMPONENT_ID + 1,
	PROPERTY_COMPONENT_START	= PROPERTY_COMPONENT_PROG_ID + 1
    } 	IASCOMPONENTPROPERTIES;

typedef /* [public] */ 
enum _PROTOCOLPROPERTIES
    {	PROPERTY_PROTOCOL_REQUEST_HANDLER	= PROPERTY_COMPONENT_START,
	PROPERTY_PROTOCOL_START	= PROPERTY_PROTOCOL_REQUEST_HANDLER + 1
    } 	PROTOCOLPROPERTIES;

typedef /* [public] */ 
enum _RADIUSPROPERTIES
    {	PROPERTY_RADIUS_ACCOUNTING_PORT	= PROPERTY_PROTOCOL_START,
	PROPERTY_RADIUS_AUTHENTICATION_PORT	= PROPERTY_RADIUS_ACCOUNTING_PORT + 1,
	PROPERTY_RADIUS_CLIENTS_COLLECTION	= PROPERTY_RADIUS_AUTHENTICATION_PORT + 1,
	PROPERTY_RADIUS_VENDORS_COLLECTION	= PROPERTY_RADIUS_CLIENTS_COLLECTION + 1
    } 	RADIUSPROPERTIES;

typedef /* [public] */ 
enum _NTEVENTLOGPROPERTIES
    {	PROPERTY_EVENTLOG_LOG_APPLICATION_EVENTS	= PROPERTY_COMPONENT_START,
	PROPERTY_EVENTLOG_LOG_MALFORMED	= PROPERTY_EVENTLOG_LOG_APPLICATION_EVENTS + 1,
	PROPERTY_EVENTLOG_LOG_DEBUG	= PROPERTY_EVENTLOG_LOG_MALFORMED + 1
    } 	NTEVENTLOGPROPERTIES;

typedef /* [public] */ 
enum _NAMESPROPERTIES
    {	PROPERTY_NAMES_REALMS	= PROPERTY_COMPONENT_START
    } 	NAMESPROPERTIES;

typedef /* [public] */ 
enum _NTSAMPROPERTIES
    {	PROPERTY_NTSAM_ALLOW_LM_AUTHENTICATION	= PROPERTY_COMPONENT_START
    } 	NTSAMPROPERTIES;

typedef /* [public] */ 
enum _ACCOUNTINGPROPERTIES
    {	PROPERTY_ACCOUNTING_LOG_ACCOUNTING	= PROPERTY_COMPONENT_START,
	PROPERTY_ACCOUNTING_LOG_ACCOUNTING_INTERIM	= PROPERTY_ACCOUNTING_LOG_ACCOUNTING + 1,
	PROPERTY_ACCOUNTING_LOG_AUTHENTICATION	= PROPERTY_ACCOUNTING_LOG_ACCOUNTING_INTERIM + 1,
	PROPERTY_ACCOUNTING_LOG_OPEN_NEW_FREQUENCY	= PROPERTY_ACCOUNTING_LOG_AUTHENTICATION + 1,
	PROPERTY_ACCOUNTING_LOG_OPEN_NEW_SIZE	= PROPERTY_ACCOUNTING_LOG_OPEN_NEW_FREQUENCY + 1,
	PROPERTY_ACCOUNTING_LOG_FILE_DIRECTORY	= PROPERTY_ACCOUNTING_LOG_OPEN_NEW_SIZE + 1,
	PROPERTY_ACCOUNTING_LOG_IAS1_FORMAT	= PROPERTY_ACCOUNTING_LOG_FILE_DIRECTORY + 1
    } 	ACCOUNTINGPROPERTIES;

typedef /* [public] */ 
enum _EAPWRAPPROPERTIES
    {	PROPERTY_EAP_SESSION_TIMEOUT	= PROPERTY_COMPONENT_START,
	PROPERTY_EAP_MAX_SESSIONS	= PROPERTY_EAP_SESSION_TIMEOUT + 1
    } 	EAPWRAPPROPERTIES;

typedef /* [public] */ 
enum _NAPPROPERTIES
    {	PROPERTY_NAP_POLICIES_COLLECTION	= PROPERTY_COMPONENT_START
    } 	NAPPROPERTIES;

typedef /* [public] */ 
enum _RADIUSPROXYPROPERTIES
    {	PROPERTY_RADIUSPROXY_SERVERGROUPS	= PROPERTY_COMPONENT_START
    } 	RADIUSPROXYPROPERTIES;

typedef /* [public] */ 
enum _SERVICE_TYPE
    {	SERVICE_TYPE_IAS	= 0,
	SERVICE_TYPE_RAS	= SERVICE_TYPE_IAS + 1,
	SERVICE_TYPE_MAX	= SERVICE_TYPE_RAS + 1
    } 	SERVICE_TYPE;

typedef /* [public] */ 
enum _IASOSTYPE
    {	SYSTEM_TYPE_NT4_WORKSTATION	= 0,
	SYSTEM_TYPE_NT5_WORKSTATION	= SYSTEM_TYPE_NT4_WORKSTATION + 1,
	SYSTEM_TYPE_NT4_SERVER	= SYSTEM_TYPE_NT5_WORKSTATION + 1,
	SYSTEM_TYPE_NT5_SERVER	= SYSTEM_TYPE_NT4_SERVER + 1
    } 	IASOSTYPE;

typedef /* [public] */ enum _IASOSTYPE *PIASOSTYPE;

typedef /* [public] */ 
enum _DOMAINTYPE
    {	DOMAIN_TYPE_NONE	= 0,
	DOMAIN_TYPE_NT4	= DOMAIN_TYPE_NONE + 1,
	DOMAIN_TYPE_NT5	= DOMAIN_TYPE_NT4 + 1,
	DOMAIN_TYPE_MIXED	= DOMAIN_TYPE_NT5 + 1
    } 	IASDOMAINTYPE;

typedef /* [public] */ enum _DOMAINTYPE *PIASDOMAINTYPE;

typedef /* [public] */ 
enum _IASDATASTORE
    {	DATA_STORE_LOCAL	= 0,
	DATA_STORE_DIRECTORY	= DATA_STORE_LOCAL + 1
    } 	IASDATASTORE;

typedef /* [public] */ enum _IASDATASTORE *PIASDATASTORE;


EXTERN_C const IID LIBID_SDOIASLib;

#ifndef __ISdoMachine_INTERFACE_DEFINED__
#define __ISdoMachine_INTERFACE_DEFINED__

/* interface ISdoMachine */
/* [unique][dual][uuid][object] */ 


EXTERN_C const IID IID_ISdoMachine;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("479F6E75-49A2-11d2-8ECA-00C04FC2F519")
    ISdoMachine : public IDispatch
    {
    public:
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE Attach( 
            /* [in] */ BSTR bstrComputerName) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetDictionarySDO( 
            /* [retval][out] */ IUnknown **ppDictionarySDO) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetServiceSDO( 
            /* [in] */ IASDATASTORE eDataStore,
            /* [in] */ BSTR bstrServiceName,
            /* [retval][out] */ IUnknown **ppServiceSDO) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetUserSDO( 
            /* [in] */ IASDATASTORE eDataStore,
            /* [in] */ BSTR bstrUserName,
            /* [retval][out] */ IUnknown **ppUserSDO) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetOSType( 
            /* [retval][out] */ IASOSTYPE *eOSType) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetDomainType( 
            /* [retval][out] */ IASDOMAINTYPE *eDomainType) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE IsDirectoryAvailable( 
            /* [retval][out] */ VARIANT_BOOL *boolDirectoryAvailable) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetAttachedComputer( 
            /* [retval][out] */ BSTR *bstrComputerName) = 0;
        
        virtual /* [hidden][id] */ HRESULT STDMETHODCALLTYPE GetSDOSchema( 
            /* [retval][out] */ IUnknown **ppSDOSchema) = 0;
        
    };
    
#else 	/* C style interface */

    typedef struct ISdoMachineVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ISdoMachine * This,
            /* [in] */ REFIID riid,
            /* [iid_is][out] */ void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ISdoMachine * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ISdoMachine * This);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfoCount )( 
            ISdoMachine * This,
            /* [out] */ UINT *pctinfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfo )( 
            ISdoMachine * This,
            /* [in] */ UINT iTInfo,
            /* [in] */ LCID lcid,
            /* [out] */ ITypeInfo **ppTInfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetIDsOfNames )( 
            ISdoMachine * This,
            /* [in] */ REFIID riid,
            /* [size_is][in] */ LPOLESTR *rgszNames,
            /* [in] */ UINT cNames,
            /* [in] */ LCID lcid,
            /* [size_is][out] */ DISPID *rgDispId);
        
        /* [local] */ HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ISdoMachine * This,
            /* [in] */ DISPID dispIdMember,
            /* [in] */ REFIID riid,
            /* [in] */ LCID lcid,
            /* [in] */ WORD wFlags,
            /* [out][in] */ DISPPARAMS *pDispParams,
            /* [out] */ VARIANT *pVarResult,
            /* [out] */ EXCEPINFO *pExcepInfo,
            /* [out] */ UINT *puArgErr);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *Attach )( 
            ISdoMachine * This,
            /* [in] */ BSTR bstrComputerName);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetDictionarySDO )( 
            ISdoMachine * This,
            /* [retval][out] */ IUnknown **ppDictionarySDO);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetServiceSDO )( 
            ISdoMachine * This,
            /* [in] */ IASDATASTORE eDataStore,
            /* [in] */ BSTR bstrServiceName,
            /* [retval][out] */ IUnknown **ppServiceSDO);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetUserSDO )( 
            ISdoMachine * This,
            /* [in] */ IASDATASTORE eDataStore,
            /* [in] */ BSTR bstrUserName,
            /* [retval][out] */ IUnknown **ppUserSDO);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetOSType )( 
            ISdoMachine * This,
            /* [retval][out] */ IASOSTYPE *eOSType);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetDomainType )( 
            ISdoMachine * This,
            /* [retval][out] */ IASDOMAINTYPE *eDomainType);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *IsDirectoryAvailable )( 
            ISdoMachine * This,
            /* [retval][out] */ VARIANT_BOOL *boolDirectoryAvailable);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetAttachedComputer )( 
            ISdoMachine * This,
            /* [retval][out] */ BSTR *bstrComputerName);
        
        /* [hidden][id] */ HRESULT ( STDMETHODCALLTYPE *GetSDOSchema )( 
            ISdoMachine * This,
            /* [retval][out] */ IUnknown **ppSDOSchema);
        
        END_INTERFACE
    } ISdoMachineVtbl;

    interface ISdoMachine
    {
        CONST_VTBL struct ISdoMachineVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ISdoMachine_QueryInterface(This,riid,ppvObject)	\
    (This)->lpVtbl -> QueryInterface(This,riid,ppvObject)

#define ISdoMachine_AddRef(This)	\
    (This)->lpVtbl -> AddRef(This)

#define ISdoMachine_Release(This)	\
    (This)->lpVtbl -> Release(This)


#define ISdoMachine_GetTypeInfoCount(This,pctinfo)	\
    (This)->lpVtbl -> GetTypeInfoCount(This,pctinfo)

#define ISdoMachine_GetTypeInfo(This,iTInfo,lcid,ppTInfo)	\
    (This)->lpVtbl -> GetTypeInfo(This,iTInfo,lcid,ppTInfo)

#define ISdoMachine_GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)	\
    (This)->lpVtbl -> GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)

#define ISdoMachine_Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)	\
    (This)->lpVtbl -> Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)


#define ISdoMachine_Attach(This,bstrComputerName)	\
    (This)->lpVtbl -> Attach(This,bstrComputerName)

#define ISdoMachine_GetDictionarySDO(This,ppDictionarySDO)	\
    (This)->lpVtbl -> GetDictionarySDO(This,ppDictionarySDO)

#define ISdoMachine_GetServiceSDO(This,eDataStore,bstrServiceName,ppServiceSDO)	\
    (This)->lpVtbl -> GetServiceSDO(This,eDataStore,bstrServiceName,ppServiceSDO)

#define ISdoMachine_GetUserSDO(This,eDataStore,bstrUserName,ppUserSDO)	\
    (This)->lpVtbl -> GetUserSDO(This,eDataStore,bstrUserName,ppUserSDO)

#define ISdoMachine_GetOSType(This,eOSType)	\
    (This)->lpVtbl -> GetOSType(This,eOSType)

#define ISdoMachine_GetDomainType(This,eDomainType)	\
    (This)->lpVtbl -> GetDomainType(This,eDomainType)

#define ISdoMachine_IsDirectoryAvailable(This,boolDirectoryAvailable)	\
    (This)->lpVtbl -> IsDirectoryAvailable(This,boolDirectoryAvailable)

#define ISdoMachine_GetAttachedComputer(This,bstrComputerName)	\
    (This)->lpVtbl -> GetAttachedComputer(This,bstrComputerName)

#define ISdoMachine_GetSDOSchema(This,ppSDOSchema)	\
    (This)->lpVtbl -> GetSDOSchema(This,ppSDOSchema)

#endif /* COBJMACROS */


#endif 	/* C style interface */



/* [id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_Attach_Proxy( 
    ISdoMachine * This,
    /* [in] */ BSTR bstrComputerName);


void __RPC_STUB ISdoMachine_Attach_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_GetDictionarySDO_Proxy( 
    ISdoMachine * This,
    /* [retval][out] */ IUnknown **ppDictionarySDO);


void __RPC_STUB ISdoMachine_GetDictionarySDO_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_GetServiceSDO_Proxy( 
    ISdoMachine * This,
    /* [in] */ IASDATASTORE eDataStore,
    /* [in] */ BSTR bstrServiceName,
    /* [retval][out] */ IUnknown **ppServiceSDO);


void __RPC_STUB ISdoMachine_GetServiceSDO_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_GetUserSDO_Proxy( 
    ISdoMachine * This,
    /* [in] */ IASDATASTORE eDataStore,
    /* [in] */ BSTR bstrUserName,
    /* [retval][out] */ IUnknown **ppUserSDO);


void __RPC_STUB ISdoMachine_GetUserSDO_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_GetOSType_Proxy( 
    ISdoMachine * This,
    /* [retval][out] */ IASOSTYPE *eOSType);


void __RPC_STUB ISdoMachine_GetOSType_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_GetDomainType_Proxy( 
    ISdoMachine * This,
    /* [retval][out] */ IASDOMAINTYPE *eDomainType);


void __RPC_STUB ISdoMachine_GetDomainType_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_IsDirectoryAvailable_Proxy( 
    ISdoMachine * This,
    /* [retval][out] */ VARIANT_BOOL *boolDirectoryAvailable);


void __RPC_STUB ISdoMachine_IsDirectoryAvailable_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_GetAttachedComputer_Proxy( 
    ISdoMachine * This,
    /* [retval][out] */ BSTR *bstrComputerName);


void __RPC_STUB ISdoMachine_GetAttachedComputer_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [hidden][id] */ HRESULT STDMETHODCALLTYPE ISdoMachine_GetSDOSchema_Proxy( 
    ISdoMachine * This,
    /* [retval][out] */ IUnknown **ppSDOSchema);


void __RPC_STUB ISdoMachine_GetSDOSchema_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);



#endif 	/* __ISdoMachine_INTERFACE_DEFINED__ */


#ifndef __ISdoServiceControl_INTERFACE_DEFINED__
#define __ISdoServiceControl_INTERFACE_DEFINED__

/* interface ISdoServiceControl */
/* [unique][dual][uuid][object] */ 


EXTERN_C const IID IID_ISdoServiceControl;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("479F6E74-49A2-11d2-8ECA-00C04FC2F519")
    ISdoServiceControl : public IDispatch
    {
    public:
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE StartService( void) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE StopService( void) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetServiceStatus( 
            /* [retval][out] */ LONG *status) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE ResetService( void) = 0;
        
    };
    
#else 	/* C style interface */

    typedef struct ISdoServiceControlVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ISdoServiceControl * This,
            /* [in] */ REFIID riid,
            /* [iid_is][out] */ void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ISdoServiceControl * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ISdoServiceControl * This);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfoCount )( 
            ISdoServiceControl * This,
            /* [out] */ UINT *pctinfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfo )( 
            ISdoServiceControl * This,
            /* [in] */ UINT iTInfo,
            /* [in] */ LCID lcid,
            /* [out] */ ITypeInfo **ppTInfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetIDsOfNames )( 
            ISdoServiceControl * This,
            /* [in] */ REFIID riid,
            /* [size_is][in] */ LPOLESTR *rgszNames,
            /* [in] */ UINT cNames,
            /* [in] */ LCID lcid,
            /* [size_is][out] */ DISPID *rgDispId);
        
        /* [local] */ HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ISdoServiceControl * This,
            /* [in] */ DISPID dispIdMember,
            /* [in] */ REFIID riid,
            /* [in] */ LCID lcid,
            /* [in] */ WORD wFlags,
            /* [out][in] */ DISPPARAMS *pDispParams,
            /* [out] */ VARIANT *pVarResult,
            /* [out] */ EXCEPINFO *pExcepInfo,
            /* [out] */ UINT *puArgErr);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *StartService )( 
            ISdoServiceControl * This);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *StopService )( 
            ISdoServiceControl * This);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetServiceStatus )( 
            ISdoServiceControl * This,
            /* [retval][out] */ LONG *status);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *ResetService )( 
            ISdoServiceControl * This);
        
        END_INTERFACE
    } ISdoServiceControlVtbl;

    interface ISdoServiceControl
    {
        CONST_VTBL struct ISdoServiceControlVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ISdoServiceControl_QueryInterface(This,riid,ppvObject)	\
    (This)->lpVtbl -> QueryInterface(This,riid,ppvObject)

#define ISdoServiceControl_AddRef(This)	\
    (This)->lpVtbl -> AddRef(This)

#define ISdoServiceControl_Release(This)	\
    (This)->lpVtbl -> Release(This)


#define ISdoServiceControl_GetTypeInfoCount(This,pctinfo)	\
    (This)->lpVtbl -> GetTypeInfoCount(This,pctinfo)

#define ISdoServiceControl_GetTypeInfo(This,iTInfo,lcid,ppTInfo)	\
    (This)->lpVtbl -> GetTypeInfo(This,iTInfo,lcid,ppTInfo)

#define ISdoServiceControl_GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)	\
    (This)->lpVtbl -> GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)

#define ISdoServiceControl_Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)	\
    (This)->lpVtbl -> Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)


#define ISdoServiceControl_StartService(This)	\
    (This)->lpVtbl -> StartService(This)

#define ISdoServiceControl_StopService(This)	\
    (This)->lpVtbl -> StopService(This)

#define ISdoServiceControl_GetServiceStatus(This,status)	\
    (This)->lpVtbl -> GetServiceStatus(This,status)

#define ISdoServiceControl_ResetService(This)	\
    (This)->lpVtbl -> ResetService(This)

#endif /* COBJMACROS */


#endif 	/* C style interface */



/* [id] */ HRESULT STDMETHODCALLTYPE ISdoServiceControl_StartService_Proxy( 
    ISdoServiceControl * This);


void __RPC_STUB ISdoServiceControl_StartService_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoServiceControl_StopService_Proxy( 
    ISdoServiceControl * This);


void __RPC_STUB ISdoServiceControl_StopService_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoServiceControl_GetServiceStatus_Proxy( 
    ISdoServiceControl * This,
    /* [retval][out] */ LONG *status);


void __RPC_STUB ISdoServiceControl_GetServiceStatus_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoServiceControl_ResetService_Proxy( 
    ISdoServiceControl * This);


void __RPC_STUB ISdoServiceControl_ResetService_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);



#endif 	/* __ISdoServiceControl_INTERFACE_DEFINED__ */


#ifndef __ISdo_INTERFACE_DEFINED__
#define __ISdo_INTERFACE_DEFINED__

/* interface ISdo */
/* [unique][dual][uuid][object] */ 


EXTERN_C const IID IID_ISdo;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("56BC53DE-96DB-11D1-BF3F-000000000000")
    ISdo : public IDispatch
    {
    public:
        virtual /* [hidden][id] */ HRESULT STDMETHODCALLTYPE GetPropertyInfo( 
            /* [in] */ LONG Id,
            /* [retval][out] */ IUnknown **ppPropertyInfo) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetProperty( 
            /* [in] */ LONG Id,
            /* [retval][out] */ VARIANT *pValue) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE PutProperty( 
            /* [in] */ LONG Id,
            /* [in] */ VARIANT *pValue) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE ResetProperty( 
            /* [in] */ LONG Id) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE Apply( void) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE Restore( void) = 0;
        
        virtual /* [id][propget] */ HRESULT STDMETHODCALLTYPE get__NewEnum( 
            /* [retval][out] */ IUnknown **ppEnumVARIANT) = 0;
        
    };
    
#else 	/* C style interface */

    typedef struct ISdoVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ISdo * This,
            /* [in] */ REFIID riid,
            /* [iid_is][out] */ void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ISdo * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ISdo * This);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfoCount )( 
            ISdo * This,
            /* [out] */ UINT *pctinfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfo )( 
            ISdo * This,
            /* [in] */ UINT iTInfo,
            /* [in] */ LCID lcid,
            /* [out] */ ITypeInfo **ppTInfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetIDsOfNames )( 
            ISdo * This,
            /* [in] */ REFIID riid,
            /* [size_is][in] */ LPOLESTR *rgszNames,
            /* [in] */ UINT cNames,
            /* [in] */ LCID lcid,
            /* [size_is][out] */ DISPID *rgDispId);
        
        /* [local] */ HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ISdo * This,
            /* [in] */ DISPID dispIdMember,
            /* [in] */ REFIID riid,
            /* [in] */ LCID lcid,
            /* [in] */ WORD wFlags,
            /* [out][in] */ DISPPARAMS *pDispParams,
            /* [out] */ VARIANT *pVarResult,
            /* [out] */ EXCEPINFO *pExcepInfo,
            /* [out] */ UINT *puArgErr);
        
        /* [hidden][id] */ HRESULT ( STDMETHODCALLTYPE *GetPropertyInfo )( 
            ISdo * This,
            /* [in] */ LONG Id,
            /* [retval][out] */ IUnknown **ppPropertyInfo);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetProperty )( 
            ISdo * This,
            /* [in] */ LONG Id,
            /* [retval][out] */ VARIANT *pValue);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *PutProperty )( 
            ISdo * This,
            /* [in] */ LONG Id,
            /* [in] */ VARIANT *pValue);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *ResetProperty )( 
            ISdo * This,
            /* [in] */ LONG Id);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *Apply )( 
            ISdo * This);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *Restore )( 
            ISdo * This);
        
        /* [id][propget] */ HRESULT ( STDMETHODCALLTYPE *get__NewEnum )( 
            ISdo * This,
            /* [retval][out] */ IUnknown **ppEnumVARIANT);
        
        END_INTERFACE
    } ISdoVtbl;

    interface ISdo
    {
        CONST_VTBL struct ISdoVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ISdo_QueryInterface(This,riid,ppvObject)	\
    (This)->lpVtbl -> QueryInterface(This,riid,ppvObject)

#define ISdo_AddRef(This)	\
    (This)->lpVtbl -> AddRef(This)

#define ISdo_Release(This)	\
    (This)->lpVtbl -> Release(This)


#define ISdo_GetTypeInfoCount(This,pctinfo)	\
    (This)->lpVtbl -> GetTypeInfoCount(This,pctinfo)

#define ISdo_GetTypeInfo(This,iTInfo,lcid,ppTInfo)	\
    (This)->lpVtbl -> GetTypeInfo(This,iTInfo,lcid,ppTInfo)

#define ISdo_GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)	\
    (This)->lpVtbl -> GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)

#define ISdo_Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)	\
    (This)->lpVtbl -> Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)


#define ISdo_GetPropertyInfo(This,Id,ppPropertyInfo)	\
    (This)->lpVtbl -> GetPropertyInfo(This,Id,ppPropertyInfo)

#define ISdo_GetProperty(This,Id,pValue)	\
    (This)->lpVtbl -> GetProperty(This,Id,pValue)

#define ISdo_PutProperty(This,Id,pValue)	\
    (This)->lpVtbl -> PutProperty(This,Id,pValue)

#define ISdo_ResetProperty(This,Id)	\
    (This)->lpVtbl -> ResetProperty(This,Id)

#define ISdo_Apply(This)	\
    (This)->lpVtbl -> Apply(This)

#define ISdo_Restore(This)	\
    (This)->lpVtbl -> Restore(This)

#define ISdo_get__NewEnum(This,ppEnumVARIANT)	\
    (This)->lpVtbl -> get__NewEnum(This,ppEnumVARIANT)

#endif /* COBJMACROS */


#endif 	/* C style interface */



/* [hidden][id] */ HRESULT STDMETHODCALLTYPE ISdo_GetPropertyInfo_Proxy( 
    ISdo * This,
    /* [in] */ LONG Id,
    /* [retval][out] */ IUnknown **ppPropertyInfo);


void __RPC_STUB ISdo_GetPropertyInfo_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdo_GetProperty_Proxy( 
    ISdo * This,
    /* [in] */ LONG Id,
    /* [retval][out] */ VARIANT *pValue);


void __RPC_STUB ISdo_GetProperty_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdo_PutProperty_Proxy( 
    ISdo * This,
    /* [in] */ LONG Id,
    /* [in] */ VARIANT *pValue);


void __RPC_STUB ISdo_PutProperty_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdo_ResetProperty_Proxy( 
    ISdo * This,
    /* [in] */ LONG Id);


void __RPC_STUB ISdo_ResetProperty_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdo_Apply_Proxy( 
    ISdo * This);


void __RPC_STUB ISdo_Apply_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdo_Restore_Proxy( 
    ISdo * This);


void __RPC_STUB ISdo_Restore_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id][propget] */ HRESULT STDMETHODCALLTYPE ISdo_get__NewEnum_Proxy( 
    ISdo * This,
    /* [retval][out] */ IUnknown **ppEnumVARIANT);


void __RPC_STUB ISdo_get__NewEnum_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);



#endif 	/* __ISdo_INTERFACE_DEFINED__ */


#ifndef __ISdoCollection_INTERFACE_DEFINED__
#define __ISdoCollection_INTERFACE_DEFINED__

/* interface ISdoCollection */
/* [unique][dual][uuid][object] */ 


EXTERN_C const IID IID_ISdoCollection;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("56BC53E2-96DB-11D1-BF3F-000000000000")
    ISdoCollection : public IDispatch
    {
    public:
        virtual /* [id][propget] */ HRESULT STDMETHODCALLTYPE get_Count( 
            /* [retval][out] */ long *pCount) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE Add( 
            /* [in] */ BSTR bstrName,
            /* [out][in] */ IDispatch **ppItem) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE Remove( 
            /* [in] */ IDispatch *pItem) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE RemoveAll( void) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE Reload( void) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE IsNameUnique( 
            /* [in] */ BSTR bstrName,
            /* [retval][out] */ VARIANT_BOOL *pBool) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE Item( 
            /* [in] */ VARIANT *Name,
            /* [retval][out] */ IDispatch **pItem) = 0;
        
        virtual /* [id][propget] */ HRESULT STDMETHODCALLTYPE get__NewEnum( 
            /* [retval][out] */ IUnknown **ppEnumVARIANT) = 0;
        
    };
    
#else 	/* C style interface */

    typedef struct ISdoCollectionVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ISdoCollection * This,
            /* [in] */ REFIID riid,
            /* [iid_is][out] */ void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ISdoCollection * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ISdoCollection * This);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfoCount )( 
            ISdoCollection * This,
            /* [out] */ UINT *pctinfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfo )( 
            ISdoCollection * This,
            /* [in] */ UINT iTInfo,
            /* [in] */ LCID lcid,
            /* [out] */ ITypeInfo **ppTInfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetIDsOfNames )( 
            ISdoCollection * This,
            /* [in] */ REFIID riid,
            /* [size_is][in] */ LPOLESTR *rgszNames,
            /* [in] */ UINT cNames,
            /* [in] */ LCID lcid,
            /* [size_is][out] */ DISPID *rgDispId);
        
        /* [local] */ HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ISdoCollection * This,
            /* [in] */ DISPID dispIdMember,
            /* [in] */ REFIID riid,
            /* [in] */ LCID lcid,
            /* [in] */ WORD wFlags,
            /* [out][in] */ DISPPARAMS *pDispParams,
            /* [out] */ VARIANT *pVarResult,
            /* [out] */ EXCEPINFO *pExcepInfo,
            /* [out] */ UINT *puArgErr);
        
        /* [id][propget] */ HRESULT ( STDMETHODCALLTYPE *get_Count )( 
            ISdoCollection * This,
            /* [retval][out] */ long *pCount);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *Add )( 
            ISdoCollection * This,
            /* [in] */ BSTR bstrName,
            /* [out][in] */ IDispatch **ppItem);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *Remove )( 
            ISdoCollection * This,
            /* [in] */ IDispatch *pItem);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *RemoveAll )( 
            ISdoCollection * This);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *Reload )( 
            ISdoCollection * This);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *IsNameUnique )( 
            ISdoCollection * This,
            /* [in] */ BSTR bstrName,
            /* [retval][out] */ VARIANT_BOOL *pBool);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *Item )( 
            ISdoCollection * This,
            /* [in] */ VARIANT *Name,
            /* [retval][out] */ IDispatch **pItem);
        
        /* [id][propget] */ HRESULT ( STDMETHODCALLTYPE *get__NewEnum )( 
            ISdoCollection * This,
            /* [retval][out] */ IUnknown **ppEnumVARIANT);
        
        END_INTERFACE
    } ISdoCollectionVtbl;

    interface ISdoCollection
    {
        CONST_VTBL struct ISdoCollectionVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ISdoCollection_QueryInterface(This,riid,ppvObject)	\
    (This)->lpVtbl -> QueryInterface(This,riid,ppvObject)

#define ISdoCollection_AddRef(This)	\
    (This)->lpVtbl -> AddRef(This)

#define ISdoCollection_Release(This)	\
    (This)->lpVtbl -> Release(This)


#define ISdoCollection_GetTypeInfoCount(This,pctinfo)	\
    (This)->lpVtbl -> GetTypeInfoCount(This,pctinfo)

#define ISdoCollection_GetTypeInfo(This,iTInfo,lcid,ppTInfo)	\
    (This)->lpVtbl -> GetTypeInfo(This,iTInfo,lcid,ppTInfo)

#define ISdoCollection_GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)	\
    (This)->lpVtbl -> GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)

#define ISdoCollection_Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)	\
    (This)->lpVtbl -> Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)


#define ISdoCollection_get_Count(This,pCount)	\
    (This)->lpVtbl -> get_Count(This,pCount)

#define ISdoCollection_Add(This,bstrName,ppItem)	\
    (This)->lpVtbl -> Add(This,bstrName,ppItem)

#define ISdoCollection_Remove(This,pItem)	\
    (This)->lpVtbl -> Remove(This,pItem)

#define ISdoCollection_RemoveAll(This)	\
    (This)->lpVtbl -> RemoveAll(This)

#define ISdoCollection_Reload(This)	\
    (This)->lpVtbl -> Reload(This)

#define ISdoCollection_IsNameUnique(This,bstrName,pBool)	\
    (This)->lpVtbl -> IsNameUnique(This,bstrName,pBool)

#define ISdoCollection_Item(This,Name,pItem)	\
    (This)->lpVtbl -> Item(This,Name,pItem)

#define ISdoCollection_get__NewEnum(This,ppEnumVARIANT)	\
    (This)->lpVtbl -> get__NewEnum(This,ppEnumVARIANT)

#endif /* COBJMACROS */


#endif 	/* C style interface */



/* [id][propget] */ HRESULT STDMETHODCALLTYPE ISdoCollection_get_Count_Proxy( 
    ISdoCollection * This,
    /* [retval][out] */ long *pCount);


void __RPC_STUB ISdoCollection_get_Count_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoCollection_Add_Proxy( 
    ISdoCollection * This,
    /* [in] */ BSTR bstrName,
    /* [out][in] */ IDispatch **ppItem);


void __RPC_STUB ISdoCollection_Add_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoCollection_Remove_Proxy( 
    ISdoCollection * This,
    /* [in] */ IDispatch *pItem);


void __RPC_STUB ISdoCollection_Remove_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoCollection_RemoveAll_Proxy( 
    ISdoCollection * This);


void __RPC_STUB ISdoCollection_RemoveAll_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoCollection_Reload_Proxy( 
    ISdoCollection * This);


void __RPC_STUB ISdoCollection_Reload_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoCollection_IsNameUnique_Proxy( 
    ISdoCollection * This,
    /* [in] */ BSTR bstrName,
    /* [retval][out] */ VARIANT_BOOL *pBool);


void __RPC_STUB ISdoCollection_IsNameUnique_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoCollection_Item_Proxy( 
    ISdoCollection * This,
    /* [in] */ VARIANT *Name,
    /* [retval][out] */ IDispatch **pItem);


void __RPC_STUB ISdoCollection_Item_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id][propget] */ HRESULT STDMETHODCALLTYPE ISdoCollection_get__NewEnum_Proxy( 
    ISdoCollection * This,
    /* [retval][out] */ IUnknown **ppEnumVARIANT);


void __RPC_STUB ISdoCollection_get__NewEnum_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);



#endif 	/* __ISdoCollection_INTERFACE_DEFINED__ */


#ifndef __ISdoDictionaryOld_INTERFACE_DEFINED__
#define __ISdoDictionaryOld_INTERFACE_DEFINED__

/* interface ISdoDictionaryOld */
/* [unique][dual][uuid][object] */ 


EXTERN_C const IID IID_ISdoDictionaryOld;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("d432e5f4-53d8-11d2-9a3a-00c04fb998ac")
    ISdoDictionaryOld : public IDispatch
    {
    public:
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE EnumAttributes( 
            /* [out][in] */ VARIANT *Id,
            /* [retval][out] */ VARIANT *pValues) = 0;
        
        virtual /* [hidden][id] */ HRESULT STDMETHODCALLTYPE GetAttributeInfo( 
            /* [in] */ ATTRIBUTEID Id,
            /* [in] */ VARIANT *pInfoIDs,
            /* [retval][out] */ VARIANT *pInfoValues) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE EnumAttributeValues( 
            /* [in] */ ATTRIBUTEID Id,
            /* [out] */ VARIANT *pValueIds,
            /* [retval][out] */ VARIANT *pValuesDesc) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE CreateAttribute( 
            /* [in] */ ATTRIBUTEID Id,
            /* [retval][out] */ IDispatch **ppAttributeObject) = 0;
        
        virtual /* [id] */ HRESULT STDMETHODCALLTYPE GetAttributeID( 
            /* [in] */ BSTR bstrAttributeName,
            /* [retval][out] */ ATTRIBUTEID *pId) = 0;
        
    };
    
#else 	/* C style interface */

    typedef struct ISdoDictionaryOldVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ISdoDictionaryOld * This,
            /* [in] */ REFIID riid,
            /* [iid_is][out] */ void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ISdoDictionaryOld * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ISdoDictionaryOld * This);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfoCount )( 
            ISdoDictionaryOld * This,
            /* [out] */ UINT *pctinfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfo )( 
            ISdoDictionaryOld * This,
            /* [in] */ UINT iTInfo,
            /* [in] */ LCID lcid,
            /* [out] */ ITypeInfo **ppTInfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetIDsOfNames )( 
            ISdoDictionaryOld * This,
            /* [in] */ REFIID riid,
            /* [size_is][in] */ LPOLESTR *rgszNames,
            /* [in] */ UINT cNames,
            /* [in] */ LCID lcid,
            /* [size_is][out] */ DISPID *rgDispId);
        
        /* [local] */ HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ISdoDictionaryOld * This,
            /* [in] */ DISPID dispIdMember,
            /* [in] */ REFIID riid,
            /* [in] */ LCID lcid,
            /* [in] */ WORD wFlags,
            /* [out][in] */ DISPPARAMS *pDispParams,
            /* [out] */ VARIANT *pVarResult,
            /* [out] */ EXCEPINFO *pExcepInfo,
            /* [out] */ UINT *puArgErr);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *EnumAttributes )( 
            ISdoDictionaryOld * This,
            /* [out][in] */ VARIANT *Id,
            /* [retval][out] */ VARIANT *pValues);
        
        /* [hidden][id] */ HRESULT ( STDMETHODCALLTYPE *GetAttributeInfo )( 
            ISdoDictionaryOld * This,
            /* [in] */ ATTRIBUTEID Id,
            /* [in] */ VARIANT *pInfoIDs,
            /* [retval][out] */ VARIANT *pInfoValues);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *EnumAttributeValues )( 
            ISdoDictionaryOld * This,
            /* [in] */ ATTRIBUTEID Id,
            /* [out] */ VARIANT *pValueIds,
            /* [retval][out] */ VARIANT *pValuesDesc);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *CreateAttribute )( 
            ISdoDictionaryOld * This,
            /* [in] */ ATTRIBUTEID Id,
            /* [retval][out] */ IDispatch **ppAttributeObject);
        
        /* [id] */ HRESULT ( STDMETHODCALLTYPE *GetAttributeID )( 
            ISdoDictionaryOld * This,
            /* [in] */ BSTR bstrAttributeName,
            /* [retval][out] */ ATTRIBUTEID *pId);
        
        END_INTERFACE
    } ISdoDictionaryOldVtbl;

    interface ISdoDictionaryOld
    {
        CONST_VTBL struct ISdoDictionaryOldVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ISdoDictionaryOld_QueryInterface(This,riid,ppvObject)	\
    (This)->lpVtbl -> QueryInterface(This,riid,ppvObject)

#define ISdoDictionaryOld_AddRef(This)	\
    (This)->lpVtbl -> AddRef(This)

#define ISdoDictionaryOld_Release(This)	\
    (This)->lpVtbl -> Release(This)


#define ISdoDictionaryOld_GetTypeInfoCount(This,pctinfo)	\
    (This)->lpVtbl -> GetTypeInfoCount(This,pctinfo)

#define ISdoDictionaryOld_GetTypeInfo(This,iTInfo,lcid,ppTInfo)	\
    (This)->lpVtbl -> GetTypeInfo(This,iTInfo,lcid,ppTInfo)

#define ISdoDictionaryOld_GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)	\
    (This)->lpVtbl -> GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)

#define ISdoDictionaryOld_Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)	\
    (This)->lpVtbl -> Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)


#define ISdoDictionaryOld_EnumAttributes(This,Id,pValues)	\
    (This)->lpVtbl -> EnumAttributes(This,Id,pValues)

#define ISdoDictionaryOld_GetAttributeInfo(This,Id,pInfoIDs,pInfoValues)	\
    (This)->lpVtbl -> GetAttributeInfo(This,Id,pInfoIDs,pInfoValues)

#define ISdoDictionaryOld_EnumAttributeValues(This,Id,pValueIds,pValuesDesc)	\
    (This)->lpVtbl -> EnumAttributeValues(This,Id,pValueIds,pValuesDesc)

#define ISdoDictionaryOld_CreateAttribute(This,Id,ppAttributeObject)	\
    (This)->lpVtbl -> CreateAttribute(This,Id,ppAttributeObject)

#define ISdoDictionaryOld_GetAttributeID(This,bstrAttributeName,pId)	\
    (This)->lpVtbl -> GetAttributeID(This,bstrAttributeName,pId)

#endif /* COBJMACROS */


#endif 	/* C style interface */



/* [id] */ HRESULT STDMETHODCALLTYPE ISdoDictionaryOld_EnumAttributes_Proxy( 
    ISdoDictionaryOld * This,
    /* [out][in] */ VARIANT *Id,
    /* [retval][out] */ VARIANT *pValues);


void __RPC_STUB ISdoDictionaryOld_EnumAttributes_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [hidden][id] */ HRESULT STDMETHODCALLTYPE ISdoDictionaryOld_GetAttributeInfo_Proxy( 
    ISdoDictionaryOld * This,
    /* [in] */ ATTRIBUTEID Id,
    /* [in] */ VARIANT *pInfoIDs,
    /* [retval][out] */ VARIANT *pInfoValues);


void __RPC_STUB ISdoDictionaryOld_GetAttributeInfo_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoDictionaryOld_EnumAttributeValues_Proxy( 
    ISdoDictionaryOld * This,
    /* [in] */ ATTRIBUTEID Id,
    /* [out] */ VARIANT *pValueIds,
    /* [retval][out] */ VARIANT *pValuesDesc);


void __RPC_STUB ISdoDictionaryOld_EnumAttributeValues_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoDictionaryOld_CreateAttribute_Proxy( 
    ISdoDictionaryOld * This,
    /* [in] */ ATTRIBUTEID Id,
    /* [retval][out] */ IDispatch **ppAttributeObject);


void __RPC_STUB ISdoDictionaryOld_CreateAttribute_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);


/* [id] */ HRESULT STDMETHODCALLTYPE ISdoDictionaryOld_GetAttributeID_Proxy( 
    ISdoDictionaryOld * This,
    /* [in] */ BSTR bstrAttributeName,
    /* [retval][out] */ ATTRIBUTEID *pId);


void __RPC_STUB ISdoDictionaryOld_GetAttributeID_Stub(
    IRpcStubBuffer *This,
    IRpcChannelBuffer *_pRpcChannelBuffer,
    PRPC_MESSAGE _pRpcMessage,
    DWORD *_pdwStubPhase);



#endif 	/* __ISdoDictionaryOld_INTERFACE_DEFINED__ */


EXTERN_C const CLSID CLSID_SdoMachine;

#ifdef __cplusplus

class DECLSPEC_UUID("E9218AE7-9E91-11D1-BF60-0080C7846BC0")
SdoMachine;
#endif
#endif /* __SDOIASLib_LIBRARY_DEFINED__ */

/* Additional Prototypes for ALL interfaces */

/* end of Additional Prototypes */

#ifdef __cplusplus
}
#endif

#endif


