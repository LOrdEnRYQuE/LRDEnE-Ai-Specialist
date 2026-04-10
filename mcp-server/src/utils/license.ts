export type Tier = "starter" | "pro" | "agency";

export interface LicenseStatus {
  tier: Tier;
  isActive: boolean;
  features: string[];
}

export function validateLicense(licenseKey?: string): LicenseStatus {
  // Simple mock validation logic
  if (!licenseKey) {
    return {
      tier: "starter",
      isActive: true,
      features: ["repo_scan", "crawl_site", "seo_audit"]
    };
  }

  if (licenseKey.startsWith("PRO-")) {
    return {
      tier: "pro",
      isActive: true,
      features: [
        "repo_scan", "architecture_plan", "scaffold_feature",
        "crawl_site", "seo_audit", "schema_markup",
        "privacy_policy_inputs", "data_flow_map", "gdpr_gap_report", "dsar_pack"
      ]
    };
  }

  if (licenseKey.startsWith("AGENCY-")) {
    return {
      tier: "agency",
      isActive: true,
      features: ["*"] // All features including future custom packs
    };
  }

  return {
    tier: "starter",
    isActive: true,
    features: ["repo_scan", "crawl_site", "seo_audit"]
  };
}

export function checkFeatureAccess(tier: LicenseStatus, toolName: string): boolean {
  if (tier.features.includes("*")) return true;
  return tier.features.includes(toolName);
}
