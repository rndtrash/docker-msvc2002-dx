<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">
	<xsl:template match="/">
		<table border="0" cellpadding="2" cellspacing="0" width="100%" valign="center" align="center" rules="cols">
			<xsl:choose>
				<xsl:when test="discovery/contractRef">
			        <tr valign="center" align="left">
				        <td>
					        <table border="0" cellpadding="2" cellspacing="0" width="100%">
						        <tr>
							        <td class="header" colspan="2" bgcolor="#cccc99" id="100">Web Services</td>
						        </tr>
					        </table>
				        </td>
			        </tr>
					<xsl:for-each select="discovery/contractRef" order-by='@ref'>
						<tr valign="center" align="left">
							<td>
								<table border="0" cellpadding="2" cellspacing="0">
									<tr>
										<td>
											<img src="..\service.gif" />
										</td>
										<td class="label" colspan="2" nowrap="true">
											<xsl:value-of select="@ref" />
										</td>
									</tr>
									<tr>
										<td />
										<td class="label">
											<a id="101"><xsl:attribute name="href">VS:<xsl:value-of select="@ref" /></xsl:attribute>View Contract</a>
											<xsl:choose>
												<xsl:when test="@docRef">
													<br />
													<a id="102"><xsl:attribute name="href">VS:<xsl:value-of select="@docRef" /></xsl:attribute>View Documentation</a>
												</xsl:when>
											</xsl:choose>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</xsl:for-each>
					<tr valign="center" align="left">
						<td class="label">
							<p>&#160;</p>
						</td>
					</tr>
				</xsl:when>
			</xsl:choose>
			<xsl:choose>
				<xsl:when test="discovery/schemaRef">
					<tr valign="center" align="left">
						<td>
							<table border="0" cellpadding="2" cellspacing="0" width="100%">
								<tr>
									<td class="header" colspan="2" bgcolor="#cccc99" id="112">DataSets</td>
								</tr>
							</table>
						</td>
					</tr>
					<xsl:for-each select="discovery/schemaRef" order-by='@ref'>
						<tr valign="center">
							<td>
								<table border="0" cellpadding="2" cellspacing="0">
									<tr>
										<td>
											<img src="..\schema.gif" />
										</td>
										<td class="label" colspan="2" nowrap="true">
											<xsl:value-of select="@ref" />
										</td>
									</tr>
									<tr>
										<td />
										<td class="label">
											<a id="103"><xsl:attribute name="href">VS:<xsl:value-of select="@ref" /></xsl:attribute>View Schema</a>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</xsl:for-each>
					<tr valign="center" align="left">
						<td class="label">
							<p>&#160;</p>
						</td>
					</tr>
				</xsl:when>
			</xsl:choose>
			<xsl:choose>
				<xsl:when test="discovery/discoveryRef">
					<tr valign="center" align="left">
						<td>
							<table border="0" cellpadding="2" cellspacing="0" width="100%">
								<tr>
        						<td class="header" colspan="2" bgcolor="#cccc99" id="104">Discovery Documents</td>
								</tr>
							</table>
						</td>
					</tr>
					<xsl:for-each select="discovery/discoveryRef" order-by='@ref'>
						<tr>
							<td>
								<table border="0" cellpadding="2" cellspacing="0">
									<tr>
										<td>
											<img src="..\disco.gif" />
										</td>
										<td class="label">
											<a>
												<xsl:attribute name="href">VS:<xsl:value-of select="@ref" /></xsl:attribute>
												<xsl:value-of select="@ref" />
											</a>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</xsl:for-each>
					<tr valign="center" align="left">
						<td class="label">
							<p>&#160;</p>
						</td>
					</tr>
				</xsl:when>
			</xsl:choose>
			<xsl:choose>
				<xsl:when test="discovery/contractRef | discovery/schemaRef | discovery/discoveryRef"></xsl:when>
				<xsl:otherwise>
			        <tr valign="center" align="left">
				        <td>
					        <table border="0" cellpadding="2" cellspacing="0" width="100%">
						        <tr>
							        <td class="header" colspan="2" bgcolor="#cccc99" id="114">Web Services</td>
						        </tr>
					        </table>
				        </td>
			        </tr>
					<tr>
						<td class="text" id="111">(none)</td>
					</tr>
					<tr valign="center">
						<td class="text" id="105">No Web References were found on this page.</td>
					</tr>
					<tr>
						<td class="text" id="106">Click for <a href="helpwatermark.htm" id="107">help on finding a Web Reference</a>.</td>
					</tr>
			        <xsl:choose>
    				    <xsl:when test="vsautoproxyhelp">
					        <tr valign="center" align="left">
						        <td class="label">
							        <p>&#160;</p>
						        </td>
					        </tr>
			                <tr valign="center" align="left">
				                <td>
					                <table border="0" cellpadding="2" cellspacing="0" width="100%">
						                <tr>
							                <td class="header" colspan="2" bgcolor="#cccc99" id="115">Errors</td>
						                </tr>
					                </table>
				                </td>
			                </tr>
					        <tr valign="center">
						        <td class="text" id="108">The proxy settings on this computer are not configured correctly for web discovery.</td>
					        </tr>
    				        <tr>
					            <td class="text" id="109">Click for <a href="vs:proxyhelp" id="110">additional help on proxy settings</a>.</td>
					        </tr>
					    </xsl:when>
				    </xsl:choose>
			        <xsl:choose>
    				    <xsl:when test="vserrorhelp">
					        <tr valign="center" align="left">
						        <td class="label">
							        <p>&#160;</p>
						        </td>
					        </tr>
			                <tr valign="center" align="left">
				                <td>
					                <table border="0" cellpadding="2" cellspacing="0" width="100%">
						                <tr>
							                <td class="header" colspan="2" bgcolor="#cccc99" id="113">Errors</td>
						                </tr>
					                </table>
				                </td>
			                </tr>
    				        <tr>
					            <td><pre class="errtext"><xsl:value-of select="vserrorhelp"/></pre></td>
					        </tr>
					    </xsl:when>
				    </xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
		</table>
	</xsl:template>
</xsl:stylesheet>
